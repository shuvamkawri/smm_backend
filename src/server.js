const express = require("express");
const connectDB = require("./DB");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // ✅ ADD THIS LINE
const userRoute = require("./route/user.route");
const orderRoute = require("./route/order.route");

require("dotenv").config();
const port = process.env.PORT;
const app = express();

// ✅ Enable CORS for all domains (for testing / dev)
app.use(cors({
  origin: "*", // Or specify: ['http://localhost:3000', 'https://yourdomain.com']
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Root test route
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

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);

// ✅ Connect DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log("🚀 Server is running on port", port);
  });
});
