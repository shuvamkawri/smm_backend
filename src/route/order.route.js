const express = require('express');
const route = express.Router();
const {createOrder, getUserOrders} = require('../contoller/order.controller');
const { userAuth } = require("./../middleware/auth");

route.post('/create', userAuth, createOrder);
route.get('/list', userAuth, getUserOrders);

module.exports = route;