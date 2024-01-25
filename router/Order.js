const express = require('express');
const { createOrder, fetchOrderByUser, deleteOrder, updateOrder, fetchAllProduct } = require('../controller/Order');

const router = express.Router();
// Product is already base path

router.post('/',createOrder)
.get('/own',fetchOrderByUser)
.delete('/:id',deleteOrder).patch('/:id',updateOrder).get('/',fetchAllProduct)

exports.router = router;    