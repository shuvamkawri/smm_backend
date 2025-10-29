const express = require('express');
const route = express.Router();
const { registerUser, loginUser } = require('../contoller/user.controller');
// const { protect } = require('../middleware/auth.middleware');

route.post('/register', registerUser);
route.post('/login', loginUser);

module.exports = route;
