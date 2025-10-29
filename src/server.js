const express = require("express");
const connectDB = require("./DB");
const cookieParser = require('cookie-parser');                                  
const userRoute = require("./route/user.route");
const orderRoute = require("./route/order.route");

require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser())

// Add root route - this will show when someone visits your main domain
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SMM Backend API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      users: "GET /api/v1/user",
      register: "POST /api/v1/user/register", 
      login: "POST /api/v1/user/login",
      orders: "GET /api/v1/order"
    }
  });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is running on port", port);
  });
});