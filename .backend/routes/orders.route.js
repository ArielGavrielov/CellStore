const express = require('express');
const router = express.Router();

let Order = require('../models/Order');
let Product = require('../models/Product');

router.get('/:orderId', (req,res) => {
    Order.find({orderId: req.params.orderId}, (err, data) => {
        if(err) res.status(400).send({error: error.message});
        else res.send(data);
    });
});

router.post('/:userId', async (req,res) => {
    let products = [];
    for(let item of req.body.items) {
        await Product.findOne({serial: item.product.Serial}, (err, data) => {
            if(err) res.status(400).send({error: err.message});
            else products.push({id: data._id, quantity: item.quantity});
        });
    }
    Order.create({userId: req.params.userId, products: products}, (error, data) => {
        if(error) res.status(400).send({error: error.message});
        else res.send(data);
    });
});

router.put('/:orderId', (req,res) => {
    Order.findOneAndUpdate({orderId: req.params.orderId}, { $set: req.body }, (err,data) => {})
    .then(data => res.send(data))
    .catch(err => res.status(400).send({error: err.message}));
});

// After testing there is a lot documents...
router.delete('/deleteAll', (req,res) => {
    Order.deleteMany({}, (err, data) => {
        if(err) res.status(400).send({error: err.message});
        else res.send(data);
    })
})

module.exports = router;