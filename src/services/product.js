import Product from "../model/Product.js";

export const getProductById = async (_id) => {
	const product = await Product.findOne({ _id });
	return product;
};

export const getProductByCondition = async (condition) => {
	const product = await Product.findOne({ ...condition });
	return product;
};

export const createProduct = async (data) => {
	const { ...varData } = data;
	const product = await (
		await Product.create({ ...varData })
	).populate(["productCategory", "purchasedBy"]);
	return product;
};

export const updateProduct = async (id, data) => {
	const { ...varData } = data;
	const product = await Product.findByIdAndUpdate(id, { ...varData });
	return product;
};

export const deleteProduct = async (id, data) => {
	const product = await Product.findByIdAndDelete(id);
	return product;
};
export const getProductList = async (id, data) => {
	const products = await Product.find();
	return products;
};
