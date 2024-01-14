const express = require('express');
const {
    addFavorites,
    removeFavorites
} = require('../controllers/users');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.put('/addFavorites', protect, addFavorites);
router.put('/removeFavorites', protect, removeFavorites);


module.exports = router;