const Location = require('../models/Location');
const asyncHandler = require('../middleware/async');

// @desc      Get all locations
// @route     GET /api/v1/locations
// @access    Public
exports.getLocations = asyncHandler(async (req, res, next) => {
    const locations = await Location.find();
    return res.status(200).json({
        success: true, count: locations.length, data: locations
    })
});

// @desc      Get a single location
// @route     GET /api/v1/locations/:id
// @access    Public
exports.getLocation = asyncHandler(async (req, res, next) => {
    const location = await Location.find(req.params.id);
    return res.status(200).json({
        success: true, data: location
    })
});

// @desc      Create new location
// @route     POST /api/v1/locations
// @access    Private
exports.createLocation = asyncHandler(async (req, res, next) => {
    const location = await Location.create(req.body);
    res.status(201).json({ success: true, data: location });
});