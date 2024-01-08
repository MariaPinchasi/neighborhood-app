const express = require('express');
const {
    register,
    login,
    logout,
    getUser
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.put('/logout', protect, logout);
router.get('/currentUser', protect, getUser);


module.exports = router;