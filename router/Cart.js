const express = require('express');
const { fetchCartById, addToCart, updateCart, deleteFromCart } = require('../controller/Cart');

const router = express.Router();
// Brands is already base path


router.get('/',fetchCartById).post('/',addToCart).patch('/:id',updateCart).delete('/:id',deleteFromCart)

exports.router = router;