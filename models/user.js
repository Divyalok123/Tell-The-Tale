const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true //to know when it was created and when updated
});

const User = mongoose.model('User', userSchema);
module.exports = User;

