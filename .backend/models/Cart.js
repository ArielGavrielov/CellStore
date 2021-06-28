const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

let Cart = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        collection: "cart"
    }
);

Cart.plugin(idValidator);
module.exports = mongoose.model("cart",Cart);