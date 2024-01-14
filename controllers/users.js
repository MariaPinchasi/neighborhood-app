const User = require('../models/User');
const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      add Service to users favorites
// @route     PUT /api/v1/users/addFavorites
// @access    Private
exports.addFavorites = asyncHandler(async (req, res, next) => {
    let service = await Service.findById(req.body.id);
    if (!service) {
        return next(
            new ErrorResponse(`Service not found with id of ${req.body.id}`, 404)
        );
    }

    const newFavorites = req.user.favorites;
    newFavorites.push(req.body.id);
    const user = await User.findByIdAndUpdate(req.user.id, { favorites: newFavorites }, {
        new: true,
        runValidators: true
    });
    res.status(200)
        .json({ success: true, data: user });
});

// @desc      remove Service from users favorites
// @route     PUT /api/v1/users/removeFavorites
// @access    Private
exports.removeFavorites = asyncHandler(async (req, res, next) => {
    let service = await Service.findById(req.body.id);
    if (!service) {
        return next(
            new ErrorResponse(`Service not found with id of ${req.body.id}`, 404)
        );
    }
    if (!req.user.favorites.find((serviceId => serviceId === req.body.id))) {
        return next(
            new ErrorResponse(`Service with id of ${req.body.id} is not in users favorites`, 404)
        );
    }

    const newFavorites = req.user.favorites.filter((serviceId => serviceId !== req.body.id));
    const user = await User.findByIdAndUpdate(req.user.id, { favorites: newFavorites }, {
        new: true,
        runValidators: true
    });
    res.status(200)
        .json({ success: true, data: user });
});