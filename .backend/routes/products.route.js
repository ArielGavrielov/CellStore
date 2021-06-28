const express = require('express');
const router = express.Router();

let Product = require('../models/Product');

router.get('/', (req,res) => {
    Product.find((err,data) => {
        if(err) res.status(400).send({err: err.toString()});
        else res.send(data);
    });
});

router.get('/:id', (req,res) => {
    Product.findById(req.params.id, (err,data) => {
        if(err) res.status(400).send({err: err.toString()});
        else res.send(data);
    });
});

router.get('/get/:serial', (req,res) => {
    Product.find({serial: req.params.serial}, (err, data) => {
        if(err) res.status(400).send({error: err.toString()});
        else res.send(data);
    });
});

router.get('/get/all/:brand', (req,res) => {
    Product.find({brand: req.params.brand}, (err,data) => {
        if(err) res.status(400).send({error: err.toString()});
        else if(data.length == 0) res.send({error: "not found"});
        else res.send(data);
    });
});

router.post('/create', (req,res) => {
    console.log(req.body);
    Product.create(req.body, (err, data) => {
        if(err) res.status(400).send({error: err.toString()});
        else res.send(data);
    });
});

module.exports = router;