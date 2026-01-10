import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success",
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "stripe", "paypal"],
    },

    transactionId: {
      type: String,
    },
  },
  { timestamps: true } // ⭐ createdAt used for revenue stats
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
