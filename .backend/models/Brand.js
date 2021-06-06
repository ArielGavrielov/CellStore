const mongoose = require('mongoose');
const Product = require('./Product');
let Brand = new mongoose.Schema(
    {
        name: {
            type: String
        },
        url: {
            type: String
        },
        products: {
            type: [Product]
        }
    },
    {
        collection: "brands"
    }
);

module.exports = mongoose.model("brands", Brand);