const express = require('express');
const router = express.Router();
const Product = require('../models/Admin'); // Import the Product model

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    const newProduct = new Product({
        name,
        description,
        price,
        quantity,
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



