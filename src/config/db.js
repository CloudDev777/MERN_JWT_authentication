// src/config/db.js
const mongoose = require('mongoose');

const connectDB = (mongoURI) => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
};

module.exports = connectDB;
