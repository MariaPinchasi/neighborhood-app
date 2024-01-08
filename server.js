const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const cors = require('cors');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload')

// Route files
const locations = require('./routes/locations');
const services = require('./routes/services');
const auth = require('./routes/auth');
const reviews = require('./routes/reviews');

// env vars
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'));
}
// File uploading 
app.use(fileupload());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Mount routers
app.use('/api/v1/locations', locations);
app.use('/api/v1/services', services);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});