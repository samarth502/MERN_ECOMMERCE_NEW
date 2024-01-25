const express = require('express');
const { fetchUserById, updateUser } = require('../controller/User');

const router = express.Router();
// Product is already base path

router.get('/own',fetchUserById).patch('/:id',updateUser)       

exports.router = router;