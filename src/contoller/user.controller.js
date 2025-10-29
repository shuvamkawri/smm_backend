const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../utils/asyncHandler');

// Login User
const loginUser = catchAsyncErrors(async (req, res) => {
    const { phone, password } = req.body;
    const existingUser = await User.findOne({ phone });
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }               
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ message: "Login successful"});
});


// Register User
const registerUser = catchAsyncErrors(async (req, res) => {
    const { fullName, phone, password, role } = req.body;
    const isPhoneExist = await User.findOne({ phone });
    if (isPhoneExist) {
        return res.status(400).json({ message: "Phone number already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, phone, password: hashedPassword, role });
    res.status(201).json({ message: "User registered successfully", user: newUser });
});

module.exports = {
    loginUser,
    registerUser
};
