const express = require('express');
const router = express.Router();

let User = require('../models/User');

router.post("/register", (req,res) => {
    User.create(req.body, (error, data) => {
        if(error) res.send({error: error.toString()});
        else res.send(data);
    });
});

router.post("/login", (req,res) => {
    User.find({email: req.body.email, password: req.body.password}, (error, data) => {
        if(error) res.send({error: error.toString()});
        else res.json(data);
    });
});

router.get("/:email", (req,res) => {
    User.find({email: req.params.email}, (error,data) => {
        if(error) res.send({error: error.toString()});
        else res.send(data);
    });
});

module.exports = router;