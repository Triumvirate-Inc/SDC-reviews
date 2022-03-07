const router = require('express').Router();
const db = require('./db.js');
// const requests = require('./api_requests.js');

router.get('/reviews/meta*', db.getProductMeta);
router.get('/reviews*', db.getReviews);
router.put('/reviews/:review_id/helpful', db.markHelpful);
router.put('/reviews/:review_id/report', db.reportReview);
router.post('/reviews/', db.addReview);

// router.get('/reviews/*', requests.getInfo);
// router.get('/qa/*', requests.getInfo);
// router.get('/cart', requests.getInfo);

// router.post('/reviews/', requests.postInfo);
// router.post('/qa/*', requests.postInfo);
// router.post('/cart', requests.postInfo);

// router.put('/reviews/*', requests.updateInfo);
// router.put('/qa/*', requests.updateInfo);

module.exports = router;