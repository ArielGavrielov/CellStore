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
            type: String,
            required: false,
            default: new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
        }
    },
    {
        collection: "users"
    }
);

module.exports = mongoose.model("users",User);