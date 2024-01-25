const express = require('express');
const { createUser, loginUser, checkAuth } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();
// Brands is already base path


router.post('/singup',createUser).post('/login',passport.authenticate('local'),loginUser).get('/check',passport.authenticate('jwt'),checkAuth)

exports.router = router;