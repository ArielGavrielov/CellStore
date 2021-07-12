const mongoose = require('mongoose');

let Contact = new mongoose.Schema(
    {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
        },
        userName: {
            type: String,
            requierd: true
        },
        userEmail: {
            type: String,
            required: true,
        },
        subject: {
          type: String,
          requierd: true
        },
        message: {
          type: String,
          requierd: true
        },
        isAnswered: {
          type: Boolean,
          default: false
        },
        time: {
          type: String,
          default: new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
        }
    },
    {
        collection: "contact"
    }
);


module.exports = mongoose.model("contact",Contact);
