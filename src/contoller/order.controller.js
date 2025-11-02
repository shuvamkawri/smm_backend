const Order = require("./../model/order.model");
const User = require("./../model/user.model");
const catchAsyncErrors = require("../utils/asyncHandler");

// Create Order
const createOrder = catchAsyncErrors(async (req, res) => {
  const {
    items,
    advancedAmount,
    image,
    status,
  } = req.body;

  const processedItems = items.map((item) => ({
    itemName: item.itemName,
    quantity: item.quantity,
    pricePerPiece: item.pricePerPiece,
  }));

  const totalAmountCalculated = processedItems.reduce(
    (acc, item) => acc + item.quantity * item.pricePerPiece,
    0
  );

  const dueAmount = totalAmountCalculated - (advancedAmount || 0);

  const newOrder = await Order.create({
    createdBy: req.user,
    items: processedItems,
    totalAmount: totalAmountCalculated,
    advancedAmount: advancedAmount || 0,
    dueAmount,
    image,
    status: status || "pending",
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order: newOrder,
  });
});

// Get User Orders
const getUserOrders = catchAsyncErrors(async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId);
  const userRole = user?.role;
  let orders;

  if (userRole === "owner") {
    orders = await Order.find().populate({ path: "createdBy", select: "-password" });
  } else {
    orders = await Order.find({ createdBy: userId }).select("items status").populate({ path: "createdBy", select: "-password" });
  }

  res.status(200).json({ 
    success: true,
    orders 
  });
});

module.exports = {
  createOrder,
  getUserOrders,
};