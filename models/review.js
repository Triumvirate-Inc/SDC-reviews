const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // _id is built into mongoose
  //one-many --> embed ObjectIds
  reviewId: { type: Number, default: null },
  product_id: { type: Number, required: true },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  summary: { type: String, default: null },
  recommend: { type: Boolean, required: true },
  response: { type: String, default: null },
  body: {
    type: String,
    minLength: 50,
    maxLength: 1000,
  },
  date: { type: String, default: (new Date()).toISOString() },
  reviewer_name: { type: String, required: true },
  reviewer_email: { type: String, required: true },
  helpfulness: { type: Number, default: 0 },
  photos: {
    type: [String],
    validate: v => Array.isArray(v) && v.length >= 0,
  },
  reported: { type: Boolean, default: false }, // Reported reviews don't appear in GET requests
  characteristics: { type: Object, required: true } // embed because < 200 entries { 'Fit', 4, ...  }
});

const productSchema = new mongoose.Schema({
  // _id is built into mongoose
  product_id: { type: Number, required: true },
  // ratings: {
  //   1: Number,
  //   2: Number,
  //   3: Number,
  //   4: Number,
  //   5: Number,
  // },
  // recommended: {
  //   true: Number,
  //   false: Number,
  // },
  //adjust schema per product to include only relevant characteristics
  productCharacteristics: Object // {id: {name: string, value: null}}
});

const Review = mongoose.model('Review', reviewSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Review, Product };
