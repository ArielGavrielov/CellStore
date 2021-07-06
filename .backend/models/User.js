const mongoose = require('mongoose');
let User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        last_login: {
            type: Date,
            required: false,
            default: new Date()
        }
    },
    {
        collection: "users"
    }
);

module.exports = mongoose.model("users",User);