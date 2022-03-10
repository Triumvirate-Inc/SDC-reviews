const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../models/review').Product;

// localhost connection
mongoose.connect('mongodb://localhost:27017/SDC-copy', {
  useNewUrlParser: true,
});

const productChars = {};
let products = [];
fs.createReadStream('../SDC-legacy-data/characteristics.csv')
.pipe(csv())
.on('data', (data) => {
  if (!productChars[data.product_id]) productChars[data.product_id] = {};
  productChars[data.product_id][data.id] = { name: data.name, value: null };
})
.on('end', () => {
  // console.log(productChars);
  for (key in productChars) {
    products.push(new Product({
      product_id: Number(key),
      productCharacteristics: productChars[key]
    }))
    if (products.length >= 100000){
      Product.insertMany(products);
      products = [];
    }
  }
  Product.insertMany(products);
});
