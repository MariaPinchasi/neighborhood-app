const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review'],
        maxLength: 50
    },
    text: {
        type: String,
        required: [true, 'Please add some text'],
        maxLength: 500

    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    service: {
        type: mongoose.Schema.ObjectId,
        ref: 'Service',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Prevent user from submitting more than one review per service
ReviewSchema.index({ service: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (serviceId) {
    const obj = await this.aggregate([
        {
            $match: { service: serviceId }
        },
        {
            $group: {
                _id: '$service',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        if (obj[0]) {
            await this.model("Service").findByIdAndUpdate(serviceId, {
                averageRating: obj[0].averageRating.toFixed(1),
            });
        } else {
            await this.model("Service").findByIdAndUpdate(serviceId, {
                averageRating: undefined,
            });
        }
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after save
ReviewSchema.post('save', async function () {
    await this.constructor.getAverageRating(this.service);
});

// Call getAverageRating before remove
ReviewSchema.post('deleteOne', { document: true, query: false }, async function () {
    await this.constructor.getAverageRating(this.service);
});

module.exports = mongoose.model('Review', ReviewSchema);