const mongoose = require('mongoose');
var idValidator = require('mongoose-id-validator');

let Brand = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
    },
    {
        collection: "brands"
    }
);

Brand.plugin(idValidator);
module.exports = mongoose.model("brands", Brand);