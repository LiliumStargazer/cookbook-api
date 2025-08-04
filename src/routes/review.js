// JavaScript
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.post('/', auth, reviewController.createReview);
router.get('/meal/:idMeal',auth, reviewController.getReviewsByMeal);
router.delete('/:id',auth,  reviewController.deleteReview);

module.exports = router;