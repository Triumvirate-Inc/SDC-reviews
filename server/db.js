const mongoose = require('mongoose');
const Review = require('../models/review').Review;
const Product = require('../models/review').Product;
const axios = require('axios');

const db = mongoose.connect('mongodb://localhost:27017/SDC-copy', {
  useNewUrlParser: true,
});

module.exports = {
  getReviews: async(req, res) => {
    console.log(req);
    const reviews = await Review.find({product_id: req.query.product_id});
    res.status(200).send(reviews);
  },
  getProductMeta: async(req, res) => {
    const id = req.query.product_id;
    let meta = {
      product_id: id,
      ratings: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
      recommended: {false: 0, true: 0},
      characteristics: {},
    };
    const productChars = await Product.findOne({product_id: id});
    const reviews = await Review.find({product_id: id});
    // populate characteristics withe the products charateristics
    for (key in productChars.productCharacteristics) {
      let current = productChars.productCharacteristics[key];
      // res.status(200).send(current.name);
      meta.characteristics[current.name] = { id: key, value: null}; //
    }
    // iterate over collected reviews and assemble ratings information
    reviews.forEach((review) => {
      meta.ratings[review.rating]++;
      review.recommend ? meta.recommended.true++ : meta.recommended.false++;
      Object.entries(review.characteristics).forEach((characteristic) => {
        meta.characteristics[characteristic[0]].value += Number(characteristic[1]) / reviews.length;
      })
    });

    // res.status(200).send(productChars);
    res.status(200).send(meta);
  },
  markHelpful: async(req, res) => {

  },
  reportReview: async(req) => {

  }
}

//meta ex
// {
//   "product_id": "40346",
//   "ratings": {
//       "1": "1",
//       "3": "17",
//       "4": "1",
//       "5": "13"
//   },
//   "recommended": {
//       "false": "8",
//       "true": "24"
//   },
//   "characteristics": {
//       "Fit": {
//           "id": 135224,
//           "value": "2.5000000000000000"
//       },
//       "Length": {
//           "id": 135225,
//           "value": "3.1250000000000000"
//       },
//       "Comfort": {
//           "id": 135226,
//           "value": "2.8750000000000000"
//       },
//       "Quality": {
//           "id": 135227,
//           "value": "2.8750000000000000"
//       }
//   }
// }