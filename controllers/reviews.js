const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Service = require('../models/Service');

// @desc      Get reviews
// @route     GET /api/v1/services/:serviceId/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    const reviews = await Review.find({ service: req.params.serviceId }).populate({
        path: 'user',
        select: 'name'
    });;
    return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews
    });
});

// @desc      Get a single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'service',
        select: 'service name'
    });

    if (!review) {
        return next(
            new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: review
    });
});

// @desc      Add review
// @route     POST /api/v1/services/:serviceId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.service = req.params.serviceId;
    req.body.user = req.user.id;

    const service = await Service.findById(req.params.serviceId);

    if (!service) {
        return next(
            new ErrorResponse(
                `No service with the id of ${req.params.serviceId}`,
                404
            )
        );
    }
    // User cant write review for himself
    if (service.user.toString() === req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to add a review for your service`, 401));
    }
    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: review
    });
});

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    // in order to update the avg rating in service
    review.save();

    res.status(200).json({
        success: true,
        data: review
    });
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to delete this review`, 401));
    }

    await review.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});