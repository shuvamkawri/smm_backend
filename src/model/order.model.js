const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        itemName: {
          type: String,
          // required: true,
        },
        quantity: {
          type: Number,
          // required: true,
        },
        pricePerPiece: {
          type: Number,
          // required: true,
        },
        // itemTotal: {
        //   type: Number,
        //   // required: true,
        // },
      },
    ],  
    totalAmount: {
      type: Number,
      required: true,
    },

    advancedAmount: {
      type: Number, 
      required: false,
    },

    dueAmount: {
      type: Number,
      required: false,  
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "delivered", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
