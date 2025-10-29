const express = require('express');
const route = express.Router();
const {createOrder, getUserOrders} = require('../contoller/order.controller');
const { userAuth } = require("./../middleware/auth");

// Add this GET route for the root path
route.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Order API endpoints are working!",
    availableEndpoints: [
      "POST /api/v1/order/create (protected)",
      "GET /api/v1/order/list (protected)"
    ],
    timestamp: new Date().toISOString()
  });
});

route.post('/create', userAuth, createOrder);
route.get('/list', userAuth, getUserOrders);

module.exports = route;