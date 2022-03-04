const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // _id is built into mongoose
  //one-many --> embed ObjectIds
  reviewId: Number,
  product_id: Number,// create index to improve
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: String,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number,
  photos: Array, // Length limited to 0-5
  reported: Boolean, // Reported reviews don't appear in GET requests
  characteristics: Object // embed because < 200 entries
});

// const productSchema = new mongoose.Schema({
//   // _id is built into mongoose
//   ratings: {
//     1: Number,
//     2: Number,
//     3: Number,
//     4: Number,
//     5: Number,
//   },
//   recommended: {
//     true: Number,
//     false: Number,
//   },
//   //adjust schema per product to include only relevant characteristics
//   characteristics: Object // Going to be one-to-few. No need to avoid duplication, favor leaner schema.
// });

const Review = mongoose.model('Review', reviewSchema);
// const Product = mongoose.model('Product', productSchema);

module.exports = { Review };
