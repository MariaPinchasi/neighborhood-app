const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    favorites: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location',
        required: function () {
            return this.role !== 'admin';
        },
    }
});

// // Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// // Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// cascade deletion
UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    console.log(`Services being removed from user ${this._id}`)
    await this.model('Service').deleteMany({ user: this._id });
    await this.model('Review').deleteMany({ user: this._id });
    next();
});

module.exports = mongoose.model('User', UserSchema);