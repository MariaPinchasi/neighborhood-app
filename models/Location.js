const mongoose = require('mongoose');
const LocationSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: [true, 'Please add a city name'],
            maxlength: [20, 'Name can not be more than 20 characters']
        },
        neighborhood: {
            type: String,
            required: [true, 'Please add a neighborhood'],
            unique: true,
            maxlength: [20, 'Description can not be more than 20 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('Location', LocationSchema);