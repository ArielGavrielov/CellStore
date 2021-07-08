const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();

let User = require('../models/User');

router.post("/register", async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    User.create(req.body, (error, data) => {
        if(error) res.status(400).send({message: error.toString()});
        else res.send(data);
    });
});

router.post("/login", async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user) {
        const isValidPass = await bcrypt.compare(req.body.password, user.password);
        if(isValidPass) {
            let date = new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
            await User.updateOne({_id: user._id}, {$set: {last_login: date}});
            res.status(200).json(user);
        } else
            res.status(400).json({ message: "Username/password is incorrect." });
    } else
        res.status(400).json({message: "Username/password is incorrect."});
});

router.get("/:email", (req,res) => {
    User.findOne({email: req.params.email}, (error,data) => {
        if(error) res.status(400).send({message: error.toString()});
        else res.send(data);
    });
});

module.exports = router;
