const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// connect to mongodb
const mongodb = "mongodb://localhost:27017/CellStore";
mongoose.connect(mongodb, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const app = express();
const users = require('./routes/users.route');

app.get("/", (req,res) => {
    res.send("Hello world!");
});

app.listen(8000, () => console.log("Server started listening port 8000"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", users);