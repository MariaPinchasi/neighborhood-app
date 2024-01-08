const path = require('path');
const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all services in users location
// @route     GET /api/v1/services
// @access    Private
exports.getServices = asyncHandler(async (req, res, next) => {
    let services;
    if (req.user.role === "admin") {
        services = await Service.find(req.query);
    } else {
        services = await Service.find({ ...req.query, location: req.user.location });
    }
    return res.status(200).json({
        success: true, count: services.length, data: services
    })
});

// @desc      Get all Users services
// @route     GET /api/v1/services/userServices
// @access    Private
exports.getUserServices = asyncHandler(async (req, res, next) => {
    const services = await Service.find({ user: req.user.id });
    return res.status(200).json({
        success: true, count: services.length, data: services
    })
});

// @desc      Get single service
// @route     GET /api/v1/service/:id
// @access    private
exports.getService = asyncHandler(async (req, res, next) => {

    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(
            new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
        )
    }

    res.status(200)
        .json({ success: true, data: service });
});

// @desc      Create new service
// @route     POST /api/v1/services
// @access    Private
exports.createService = asyncHandler(async (req, res, next) => {
    //  add user to req.body
    req.body.user = req.user.id;

    if (req.user.role !== "admin") {
        //  add location to req.body
        req.body.location = req.user.location;
        //  add name to req.body
        req.body.name = req.user.name;
    }

    // check for same published service
    const publishedService = await Service.findOne({ user: req.user.id, service: req.body.service });
    // the user can publish same service only once 
    if (publishedService) {
        return next(new ErrorResponse(`The user with id ${req.user.id} has already published this service`, 400))
    }
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
});

// @desc      Update service
// @route     PUT /api/v1/services/:id
// @access    Private
exports.updateService = asyncHandler(async (req, res, next) => {
    let service = await Service.findById(req.params.id);

    if (!service) {
        return next(
            new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
        );
    }
    // make sure user is service owner
    if (service.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update this service`,
                401
            )
        );
    };
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200)
        .json({ success: true, data: service });
});

// @desc      Delete service
// @route     DELETE /api/v1/services/:id
// @access    Private

exports.deleteService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(
            new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
        );
    }
    // make sure user is service owner
    if (service.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete this service`,
                401
            )
        );
    };
    await service.deleteOne();

    res.status(200)
        .json({ success: true, data: {} });
});



// @desc      Upload photo for service
// @route     PUT /api/v1/services/:id/photo
// @access    Private
exports.servicePhotoUpload = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(
            new ErrorResponse(`Service not found with id of ${req.params.id}`, 404)
        );
    }
    // make sure user is service owner
    if (service.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update this service`,
                401
            )
        );
    };
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        );
    }

    // Create custom filename
    file.name = `photo_${service._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Service.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(200).json({
            success: true,
            data: file.name
        });
    });
});