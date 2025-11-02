const jwt = require("jsonwebtoken");
const User = require("./../model/user.model");
const catchAsyncErrors = require("./../utils/asyncHandler");
const ApiError = require("./../utils/Apierror");

const userAuth = catchAsyncErrors(async (req, res, next) => {
  let token;
  
  // Check for Bearer token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Access denied. No token provided. Please login." 
    });
  }

  try {
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decodedMessage;

    const user = await User.findById(id);
    
    if (!user) {
      throw new ApiError(400, "User not found");
    }

    req.user = user._id;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      });
    }
    next(error);
  }
});

module.exports = { userAuth };