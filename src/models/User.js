const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String, required: true,
        enum: ['client', 'admin', 'user'],
    }

});

module.exports = mongoose.model('User', userSchema);