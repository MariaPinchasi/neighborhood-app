const mongoose = require('mongoose');
const LocationSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: [true, 'Please add a city name'],
        },
        neighborhood: {
            type: String,
            required: [true, 'Please add a neighborhood'],
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('Location', LocationSchema);