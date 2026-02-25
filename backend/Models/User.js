import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		plan: {
			type: String,
			default: "Free",
		},
		lastLogin: {
			type: Date,
			default: null,
		},
		// Extended profile fields
		fullName: {
			type: String,
			default: "",
		},
		phone: {
			type: String,
			default: "",
		},
		location: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},
		github: {
			type: String,
			default: "",
		},
		linkedin: {
			type: String,
			default: "",
		},
		profileViews: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;