const express = require('express');
const router = express.Router();

let Cart = require('../models/Cart');

router.get('/:userId', (req,res) => {
    Cart.find({userId: req.params.userId}, (err, data) => {
        if(err) res.status(400).send({error: err.toString()});
        else res.send(data);
    });
});

router.post('/', (req,res) => {
    Cart.exists({userId: req.body.userId, productId: req.body.productId}).then((isExist) => {
        if(isExist) {
            Cart.updateOne({userId: req.body.userId, productId: req.body.productId}, {$set: {quantity: req.body.quantity}}, { runValidators: true })
            .then(data => res.send(data))
            .catch(err => res.status(400).send({error: err.toString()}));
        } else {
            Cart.create(req.body, (err,data) => {
                if(err) res.status(400).send({error: err.toString()});
                else res.send(data);
            });
        }
    });
});

router.delete('/:userId/:productId', (req,res) => {
    Cart.deleteOne({userId: req.params.userId, productId: req.params.productId})
    .then(value => res.send(value))
    .catch(err => res.send({error: err}));
});

router.delete('/:userId', (req,res) => {
    Cart.deleteMany({userId: req.params.userId})
    .then(value => res.send(value))
    .catch(err => res.send({error: err}));
});

module.exports = router;