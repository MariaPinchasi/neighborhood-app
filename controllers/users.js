const User = require('../models/User');
const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().populate({
        path: 'location',
        select: 'city neighborhood'
    });
    const filteredUsers = users.filter(user => user.role !== 'admin');
    return res.status(200).json({
        success: true,
        count: filteredUsers.length,
        data: filteredUsers
    });
});


// @desc      Delete user
// @route     DELETE /api/v1/users/:userId
// @access    Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(`No user with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is admin
    if (req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to delete this user`, 401));
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
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