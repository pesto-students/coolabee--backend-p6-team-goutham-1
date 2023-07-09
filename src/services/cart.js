import Cart from "../model/Cart.js";

export const getCartById = async (_id) => {
	const cart = await Cart.findOne({ _id });
	return cart;
};

export const getCartByCondition = async (condition) => {
	const cart = await Cart.findOne({ ...condition });
	return cart;
};

export const createCart = async (data) => {
	const { ...varData } = data;
	const cart = await (
		await Cart.create({ ...varData })
	).populate(["user", "products"]);
	return cart;
};

export const updateCart = async (id, data) => {
	const { ...varData } = data;
	const cart = await Cart.findByIdAndUpdate(id, { ...varData },{new: true});
	return cart;
};

export const deleteCart = async (id, data) => {
	const cart = await Cart.findByIdAndDelete(id);
	return cart;
};
export const getCartList = async (id, data) => {
	const products = await Cart.find();
	return products;
};
