const express = require('express');
const router = express.Router()
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

//Campground model and schema
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js')

//Middlewares used to verfiy
const { isLoggedIn } = require('../middleware.js');
const { validateCampground } = require('../middleware.js');
const { isAuthor } = require('../middleware.js');

//Require routes
const campgrounds = require('../controllers/campgrounds')


//************ ALL ROUTES******************* 

//Campgrounds index and post new campground
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

//New campground Form    
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

//Show, Update, delete
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

//Edit Campground Form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;