const jwt = require("jsonwebtoken");
const User = require("./../model/user.model");
const catchAsyncErrors = require("./../utils/asyncHandler");
const ApiError = require("./../utils/Apierror");

const userAuth = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send("Please Login!!!");
  }

  const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
  const { id } = decodedMessage;

  const user = await User.findById(id);
  
  if (!user) {
    // throw new Error("User not found");
     throw new ApiError(400, "User not found");
  }

  req.user = user._id;

  next();
});

module.exports = { userAuth };
