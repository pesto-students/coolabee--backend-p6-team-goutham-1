import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		default: "",
	},

	isAdmin: {
		type: Boolean,
		default: false,
	},

	email: {
		type: String,
		required: true,
		default: "",
		Unique: true,
	},

	phoneNumber: {
		type: Number,
		required: true,
		default: null,
		Unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	profilePicture: {
		type: String,
		required: false,
	},

	// By default false
	isVerified: {
		type: Boolean,
		default: false,
	},

	// By default false
	isSuspended: {
		type: Boolean,
		default: false,
	},

	// By default false
	suspendedBy: {
		type: String,
		required: false,
	},

	suspendedAt: {
		type: Date,
		required: false,
	},

	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
