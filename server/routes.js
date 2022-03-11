const router = require('express').Router();
const db = require('./db.js');
// const requests = require('./api_requests.js');
router.get('/loaderio-9456956699b1a98044af5320004835e5.txt', (req, res) => {
  res.status(200).send('loaderio-9456956699b1a98044af5320004835e5');
});
router.get('/SDC/api/reviews/meta*', db.getProductMeta);
router.get('/SDC/api/reviews/meta*', db.getProductMeta);
router.get('/SDC/api/reviews*', db.getReviews);
router.put('/SDC/api/reviews/:review_id/helpful', db.markHelpful);
router.put('/SDC/api/reviews/:review_id/report', db.reportReview);
router.post('/SDC/api/reviews/', db.addReview);


module.exports = router;