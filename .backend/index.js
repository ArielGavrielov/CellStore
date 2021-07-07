const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const users = require('./routes/users.route');
const products = require('./routes/products.route');
const brands = require('./routes/brands.route');
const cart = require('./routes/cart.route');
const orders = require('./routes/orders.route');

// connect to mongodb
const mongodb = "mongodb://localhost:27017/CellStore";
mongoose.connect(mongodb, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const app = express();
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(8000, () => console.log("Server started listening port 8000"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.set('runValidators', true);

app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/brands", brands);
app.use("/api/cart", cart);
app.use("/api/orders", orders);


// front-end
app.use(express.static(path.join(__dirname, "../dist/CellStore")));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../dist/CellStore/index.html"));
});
