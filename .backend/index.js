const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users.route');
const products = require('./routes/products.route');
const brands = require('./routes/brands.route');

// connect to mongodb
const mongodb = "mongodb://localhost:27017/CellStore";
mongoose.connect(mongodb, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const app = express();
app.use(cors({origin: 'http://localhost:4200'}));

app.get("/", (req,res) => {
    res.send("Hello world!");
});

app.listen(8000, () => console.log("Server started listening port 8000"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/brands", brands);