const mongoose = require('mongoose');
const Review = require('../models/review').Review;
const Product = require('../models/review').Product;
const axios = require('axios');

const db = mongoose.connect('mongodb://localhost:27017/SDC-copy', {
  useNewUrlParser: true,
});

module.exports = {
  getReviews: async(req, res) => {
    const { product_id, sort, page = 1, count = 5 } = req.query;
    // three possible sorts 'helpful', 'relevant', 'newest'
    let order;
    switch (sort) {
      case 'helpful':
        order = { helpfulness: -1 };
        break;
      case 'newest':
        order = { date: -1 };
        break;
      default:
       order = { helpfulness: -1, date: -1 };
    }
    const reviews = await Review.find({ product_id: product_id, reported: false }).sort(order);
    // Grab the section of reviews based on page, and count and map
    const startIndex = (page - 1) * count;
    const frontEndReviews = {
      product: product_id,
      page: page,
      count: count,
      results: [],
    }
    frontEndReviews.results = reviews.slice(startIndex, page * count).map((mongooseR) => {
      return {
        review_id: mongooseR._id,
        rating: mongooseR.rating,
        summary: mongooseR.summary,
        recommend: mongooseR.recommend,
        response: mongooseR.response,
        body: mongooseR.body,
        date: mongooseR.date,
        reviewer_name: mongooseR.reviewer_name,
        helpfulness: mongooseR. helpfulness,
        photos: mongooseR.photos,
      }
    })
    // res.status(200).send(reviews);
    res.status(200).send(frontEndReviews);
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
    const review = await Review.findById(req.params.review_id)
    review.helpfulness += 1;
    review.save()
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  },
  reportReview: async(req, res) => {
    const review = await Review.findById(req.params.review_id)
    review.reported = true;
    review.save()
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  },
  addReview: async(req, res) => {
    const product = await Product.findOne({product_id: req.body.product_id});
    let reviewFields = {
      // reviewId:
      product_id: req.body.product_id,
      rating: req.body.rating,
      summary: req.body.summary,
      recommend: req.body.recommend,
      // response:
      body: req.body.body,
      // date:
      reviewer_name: req.body.name,
      reviewer_email: req.body.email,
      // helpfulness:
      photos: req.body.photos,
      // reported:
      characteristics: {}
    }
    for (char in product.productCharacteristics) {
      reviewFields.characteristics[product.productCharacteristics[char].name] = req.body.characteristics[char];
    }
    const review = new Review(reviewFields);
    review.save()
      .then((w) => {
        res.status(201).send(w);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  }
}

// add review body params ex
// {
//   "product_id": 40344,
//   "rating": 3,
//   "summary": "what up",
//   "body": "adfuheqrguegrugrenjgfjnfgjnfaff aadfsjfdkjdfasjkldfasjkladfsj",
//   "recommend": true,
//   "name": "Owen",
//   "email": "notReal@notReal.com",
//   "photos": [],
//   "characteristics": {
//       "135219": 1,
//       "135220": 2,
//       "135221": 3,
//       "135222": 4
//   }
// }