const express = require('express');
const router = express.Router();

let User = require('../models/User');

router.get("/", (req, res) => {
    res.send("users get");
});

router.post("/register", (req,res) => {
    User.create(req.body, (error, data) => {
        if(error) res.send(error.toString());
        else res.send(data);
    });
});

router.get("/:email", (req,res) => {
    User.find({email: req.params.email}, (error,data) => {
        if(error) res.send(error.toString());
        else res.send(data);
    });
});

module.exports = router;