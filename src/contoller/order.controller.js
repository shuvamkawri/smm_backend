const Order = require("./../model/order.model");
const User = require("./../model/user.model");
const catchAsyncErrors = require("../utils/asyncHandler");

// Create Order

const createOrder = catchAsyncErrors(async (req, res) => {
  const {
    items, // Array of items with itemName, quantity, pricePerPiece
    advancedAmount,
    image,
    status,
  } = req.body;

  // Calculate itemTotal for each item and dueAmount
  const processedItems = items.map((item) => ({
    itemName: item.itemName,
    quantity: item.quantity,
    pricePerPiece: item.pricePerPiece,
    // itemTotal: item.quantity * item.pricePerPiece
  }));

  const totalAmountCalculated = processedItems.reduce(
    (acc, item) => acc + item.quantity * item.pricePerPiece,
    0
  );

  // Calculate dueAmount
  const dueAmount = totalAmountCalculated - (advancedAmount || 0);

  // Create the order
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
    message: "Order created successfully",
    order: newOrder,
  });
});

// Get User Orders
const getUserOrders = catchAsyncErrors(async (req, res) => {
  const userId = req.user;
//   console.log("User ID:", userId);
  const user = await User.findById(userId);
  const userRole = user?.role;
  let orders;
//   console.log("User Role:", userRole);
  if (userRole === "owner") {
    orders = await Order.find().populate({ path: "createdBy",select: "-password" });
  } else {
    orders = await Order.find().select("items status").populate({ path: "createdBy", select: "-password" });
  }

  res.status(200).json({ orders });
});

module.exports = {
  createOrder,
  getUserOrders,
};
