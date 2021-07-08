const express = require("express");
const router = express.Router();

let Contact = require('../models/Contact');

router.post("/", (req,res) => {
  Contact.create(req.body, (err, data) => {
    if(err) res.status(400).send({error: err.message});
    else res.send(data);
  });
});

router.get("/", (req, res) => {
  Contact.find((err, data) => {
    if(err) res.status(400).send({error: err.message});
    else res.send(data);
  });
});

router.get("/:userEmail", (req, res) => {
  Contact.find({userEmail: req.params.userEmail}, (err, data) => {
    if(err) res.status(400).send({error: err.message});
    else res.send(data);
  });
});

router.put("/answer/:id", (req, res) => {
  Contact.updateOne({_id: req.params.id}, {$set: {isAnswered: true}}, (err, data) => {
    if(err) res.status(400).send({error: err.message});
    else res.send(data);
  });
});


module.exports = router;
