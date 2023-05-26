const mongoose = require('mongoose');
const md5 = require('../utils/md5.js');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value),
    },
    about: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    history: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = userSchema;
