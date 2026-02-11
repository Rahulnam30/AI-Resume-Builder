import mongoose from "mongoose";

const deletedUserSchema = new mongoose.Schema({
  originalUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  username: String,
  email: String,
  plan: String,
  deletedAt: {
    type: Date,
    default: Date.now
  },
  deletedBy: {
    type: String,
    default: "admin"
  }
});

const DeletedUser = mongoose.model("DeletedUser", deletedUserSchema);

export default DeletedUser;
