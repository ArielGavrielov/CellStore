const mongoose = require('mongoose');
let Product = new mongoose.Schema(
    {
        Serial:{
            type: String,
            unique: true,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        Price: {
            type: Number,
            required: true
        },
        Description: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        Discount: {
            type: Number,
            required: true
        }
    },
    {
    collection: "products"
    }
);

module.exports = mongoose.model("products",Product);