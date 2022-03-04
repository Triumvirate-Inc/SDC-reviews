const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Review = require('../models/review');

// To avoid the new line when printing
console.log = function (d) {
  process.stdout.write(d);
};

// localhost connection
mongoose.connect('mongodb://localhost:27017/SDC', {
  useNewUrlParser: true,
});

let batch = [];
// For City collectioon
fs.createReadStream('../SDC-legacy-data/reviews.csv')
  .pipe(csv())
  .on('data', async (data) => {
    batch.push(new Review({
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
      photos: [],
      reported: data.reported,
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
