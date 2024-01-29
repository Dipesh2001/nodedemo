const mongoose = require('mongoose');

const connectDB = (uri) => {
    return mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB successfully');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
}

module.exports = connectDB;