const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = new mongoose.Schema(
    {
        service: {
            type: String,
            required: [true, 'Please add a service'],
            enum: ['Electrician', 'Plumber', 'Carpenter', 'Handyman', 'HVAC Technician', 'Appliance Repair Technician', 'Painter', 'Gardener/Landscaper', 'House Cleaner', 'Babysitter/Nanny', 'Pet Sitter/Dog Walker', 'Tutor', 'Personal Trainer', 'Yoga Instructor', 'Massage Therapist', 'Hair Stylist/Barber', 'Makeup Artist', 'Photographer', 'Event Planner', 'Interior Designer', 'Computer Repair Technician', 'Tutor', 'Chef/Caterer', 'Dog Trainer', 'Auto Mechanic', 'Locksmith', 'Tailor/Seamstress', 'Language Tutor/Translator', 'Financial Advisor', 'Real Estate Agent']
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },
        // slug: String,
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters']
        },
        phone: {
            type: String,
            maxlength: [12, 'Phone number can not be longer than 12 characters'],
            minlength: [9, 'Phone number can not be shorter than 9 characters']
        },
        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating must can not be more than 5']
        },
        photo: {
            type: String,
            default: 'no-photo.jpg'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        location: {
            type: mongoose.Schema.ObjectId,
            ref: 'Location',
            required: true
        }
    }
);

// Create shoe slug from the name
// ShoeSchema.pre('save', function (next) {
//     this.slug = slugify(this.name, { lower: true });
//     next();
// });


module.exports = mongoose.model('Service', ServiceSchema);