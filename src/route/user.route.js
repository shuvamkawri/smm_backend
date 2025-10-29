const express = require('express');
const route = express.Router();
const { registerUser, loginUser } = require('../contoller/user.controller');
// const { protect } = require('../middleware/auth.middleware');

// Add this GET route for the root path
route.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "User API endpoints are working!",
    availableEndpoints: [
      "POST /api/v1/user/register",
      "POST /api/v1/user/login"
    ],
    timestamp: new Date().toISOString()
  });
});

route.post('/register', registerUser);
route.post('/login', loginUser);

module.exports = route;