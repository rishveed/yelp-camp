const express = require('express');
const router = express.Router({ mergeParams: true })

//Require models and schemas
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const { reviewSchema } = require('../schemas.js')


//Require errors
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');


// Middleware validations
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js')

//Require Routes
const reviews = require('../controllers/reviews')


//*****ALL ROUTES******* */

//Create a review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

//Delete a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;