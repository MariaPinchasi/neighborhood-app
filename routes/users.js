const express = require('express');
const {
    getUsers,
    deleteUser,
    addFavorites,
    removeFavorites
} = require('../controllers/users');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(protect, authorize('admin'), getUsers);

router
    .route('/:id')
    .delete(protect, authorize('admin'), deleteUser);

router.put('/addFavorites', protect, addFavorites);
router.put('/removeFavorites', protect, removeFavorites);


module.exports = router;