import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
		default: "",
	},
	productDescription: {
		type: String,
		required: true,
		default: "",
	},
	productPrice: {
		type: String,
		required: true,
		default: "",
	},
	productQuantity: {
		type: String,
		required: true,
		default: "",
	},
	productCategory: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Category",
	},
	productPicture: {
		type: String,
		required: false,
	},

	// By default false
	isVerified: {
		type: Boolean,
		default: false,
	},
	purchasedBy: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Products", ProductSchema);
