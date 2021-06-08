const express = require('express');
const router = express.Router();

let Brand = require('../models/Brand');
let Product = require('../models/Product');

router.get('/', (req,res) => {
    Brand.find((err,data) => {
        if(err) res.send({err: err.toString()});
        else res.send(data);
    });
});

router.post('/create', (req,res) => {
    Brand.create(req.body, (err, data) => {
        if(err) res.send({error: err.toString()});
        else res.send(data);
    });
});

router.get('/:name', (req,res) => {
    Brand.find({name: req.params.name}, (err, data) => {
        if(err) res.send({error: err.toString()});
        else res.send(data);
    });
});

router.put('/:name', (req,res) => {
    Brand.findOneAndUpdate({name: req.params.name}, { $set: req.body },
        (err, data) => {
            if(err) res.send({error: err.toString()});
            else res.send(data);
        }
    );
});

router.put('/:name/addproduct/:serial', (req,res) => {
    Brand.findOneAndUpdate({name: req.params.name}, {$push: {products: req.params.serial}}, { $inc: { no_of_likes: 1 }}, (err,data) => {
        if(err) res.send({error: err.toString()});
        else res.send(data);
        console.log(data);
    });
});

module.exports = router;