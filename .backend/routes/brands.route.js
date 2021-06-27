const express = require('express');
const router = express.Router();

let Brand = require('../models/Brand');
let Product = require('../models/Product');

router.get('/', (req,res) => {
    Brand.find((err,data) => {
        if(err) res.status(400).send({err: err.message});
        else res.status(200).send(data);
    });
});

router.post('/create', (req,res) => {
    Brand.create(req.body, (err, data) => {
        if(err) res.status(400).send({error: err.message});
        else res.status(200).send(data);
    });
});

router.get('/:name', (req,res) => {
    Brand.find({name: req.params.name}, (err, data) => {
        if(err) res.status(400).send({error: err.message});
        else res.status(200).send(data);
    });
});

router.put('/:name', (req,res) => {
    Brand.findOneAndUpdate({name: req.params.name}, { $set: req.body },
        (err, data) => {
            if(err) res.send({error: err.message});
            else res.send(data);
        }
    );
});

router.put('/:name/addproduct/:productid', (req,res) => {
    Product.exists({_id: req.params.productid}).then((isExist) => {
        if(isExist) {
            Brand.findOneAndUpdate(
                {"name": req.params.name},
                {$push: {"products": req.params.productid}},
                {}, (err,data) => {
                    if(err)
                        res.status(400).send({success: false, code: 400, error: err.message});
                    else
                        res.status(200).send({success: true, code: 200, brand: req.params.name, productid: req.params.productid});
            });
        } else
            res.status(400).json({success: false, code: 400, error: "Product not found."});
    });
    /*
    Product.countDocuments({_id: req.params.productid}, (err, count) => {
        if(err) res.json({error: err.message});
        else if(count == 1) {
            Brand.findOneAndUpdate(
                {"name": req.params.name},
                {$push: {"products": req.params.productid}},
                {}, (err,data) => {
                    if(err) res.send({error: err.message});
                    else res.send(data);
                    console.log(err);
            });
        }
        else res.json({error: "Product not found."});
    });*/
});

module.exports = router;