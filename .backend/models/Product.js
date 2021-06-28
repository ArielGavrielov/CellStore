const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const Product = new mongoose.Schema(
    {
        serial:{
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        discount: {
            type: Number
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'brands'
        }
    },
    {
    collection: "products"
    }
);

Product.plugin(idValidator);
module.exports = mongoose.model("products",Product);