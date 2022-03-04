const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Review = require('../models/review').Review;

// localhost connection
mongoose.connect('mongodb://localhost:27017/SDC-copy', {
  useNewUrlParser: true,
});

let batch = [];
let photos = {}; // review_id: [url, ...]
let characteristics = {}; // charID: CharString
let reviewCharacteristics = {}; // reviewId: {CharString: values}
// For adding reviews to reviews collection with pre-compiled photo urls and embedded characteristics
fs.createReadStream('../SDC-legacy-data/characteristics.csv')
  .pipe(csv())
  .on('data', async(data) => {
    characteristics[data.id] = data.name;
  })
  .on('end', () => {
    fs.createReadStream('../SDC-legacy-data/characteristic_reviews.csv')
      .pipe(csv())
      .on('data', async(data) => {
          if (!reviewCharacteristics[data.review_id]) reviewCharacteristics[data.review_id] = {};
          reviewCharacteristics[data.review_id][characteristics[data.characteristic_id]] = data.value;
          // reviewCharacteristics[data.review_id].push([characteristics[data.characteristic_id], data.value]) :
          // reviewCharacteristics[data.review_id] = [[characteristics[data.characteristic_id], data.value]];
          // console.log(reviewCharacteristics[data.review_id]);
      })
      .on('end', () => {
        fs.createReadStream('../SDC-legacy-data/reviews_photos.csv')
          .pipe(csv())
          .on('data', async(data) => {
            photos[data.review_id] ? photos[data.review_id].push(data.url) : photos[data.review_id] = [data.url];
          })
          .on ('end', () => {
            fs.createReadStream('../SDC-legacy-data/reviews.csv')
              .pipe(csv())
              .on('data', async(data) => {
                let reviewLink = data.id;
                batch.push(new Review({
                  reviewId: reviewLink,
                  product_id: data.product_id,
                  rating: data.rating,
                  summary: data.summary,
                  recommend: data.recommend,
                  response: data.response,
                  body: data.body,
                  date: (new Date(Number(data.date))).toISOString(),
                  reviewer_name: data.reviewer_name,
                  reviewer_email: data.reviewer_email,
                  helpfulness: data.helpfulness,
                  photos: photos[reviewLink],
                  reported: data.reported,
                  characteristics: reviewCharacteristics[reviewLink],
                }));
                if (batch.length === 100000) {
                  Review.insertMany(batch)
                  batch = [];
                }
              })
              .on('end', () => {
                Review.insertMany(batch)
                  .then(() => {
                    console.log('Done');
                  });
              });
          });
      })
  })

