const express = require('express');
const {
    getLocations,
    getLocation,
    createLocation
} = require('../controllers/locations');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(getLocations)
    .post(protect, authorize('admin'), createLocation);

router
    .route('/:id')
    .get(getLocation)
module.exports = router;