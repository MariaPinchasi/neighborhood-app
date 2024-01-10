const express = require('express');

const {
    getServices,
    getUserServices,
    createService,
    getService,
    updateService,
    deleteService,
    servicePhotoUpload
} = require('../controllers/services');

// include other resource router
const reviewRouter = require('./reviews');

const router = express.Router();

const { protect } = require('../middleware/auth');

// reroute into other resource router
router.use('/:serviceId/reviews', reviewRouter);

router.route('/:id/photo').put(protect, servicePhotoUpload);
router.route('/userServices').get(protect, getUserServices);

router
    .route('/')
    .get(getServices)
    .post(protect, createService);

router
    .route('/:id')
    .get(protect, getService)
    .put(protect, updateService)
    .delete(protect, deleteService);

module.exports = router;