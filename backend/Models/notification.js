import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // kis type ka event
    type: {
      type: String,
      required: true,
      trim: true,
    },

    // message jo UI me dikhega
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // jis user se related hai
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // action kisne kiya
    // system = user panel me "You ..."
    // user   = admin panel me "username ..."
    actor: {
      type: String,
      enum: ["system", "user"],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    fromAdmin: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
