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
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is runing on port", port);
  });
});
