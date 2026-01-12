const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Fix Mongoose strictQuery warning (if using mongoose here)
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Serve React frontend in production
if(process.env.NODE_ENV === "production") {
    // Serve React static files
    app.use(express.static(path.join(__dirname, 'build')));

    // Send index.html for all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}


// Error middleware (should always be last)
app.use(errorMiddleware);

module.exports = app;
