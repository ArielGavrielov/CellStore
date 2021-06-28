const mongoose = require('mongoose');

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
        }
    },
    {
        collection: "brands"
    }
);

module.exports = mongoose.model("brands", Brand);