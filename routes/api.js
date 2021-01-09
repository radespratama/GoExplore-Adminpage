const router = require('express').Router();
const apiController  = require('../controller/API/indexController');
const { uploadSingle } = require('../middlewares/multer');

// Default View Dashboard
router.get('/landing-page', apiController.landingPage);
router.get('/detail-page/:id', apiController.detailPage);
router.post('/booking-page',uploadSingle, apiController.bookingPage);

module.exports = router;
