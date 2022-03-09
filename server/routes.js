const router = require('express').Router();
const db = require('./db.js');
// const requests = require('./api_requests.js');

router.get('/reviews/meta*', db.getProductMeta);
router.get('/reviews*', db.getReviews);
router.put('/reviews/:review_id/helpful', db.markHelpful);
router.put('/reviews/:review_id/report', db.reportReview);
router.post('/reviews/', db.addReview);


module.exports = router;