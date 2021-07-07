const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let Order = new mongoose.Schema(
    {
        orderId: {
            type: Number
        },
        isOpen: {
            type: Boolean,
            required: true,
            default: true
        },
        time: {
            type: String,
            default: new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        products: [
            new mongoose.Schema({
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }, { _id: false })
        ],
        status: {
            type: String,
            default: "Waiting for approval"
        }
    },
    {
        collection: "orders",
    }
);

Order.plugin(idValidator);
Order.plugin(AutoIncrement, {inc_field: 'orderId'});
module.exports = mongoose.model("orders",Order);