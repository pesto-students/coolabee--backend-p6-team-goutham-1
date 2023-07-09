import Category from "../model/Category.js";

export const getCategoryById = async (_id) => {
	const category = await Category.findOne({ _id });
	return category;
};

export const createCategory = async (data) => {
	const { ...varData } = data;
	const category = await Category.create({ ...varData });
	return category;
};

export const getCategoryByCondition = async (condition) => {
	const category = await Category.findOne({ ...condition });
	return category;
};

export const updateCategory = async (id, data) => {
	const { ...varData } = data;
	const category = await Category.findByIdAndUpdate(id, { ...varData },{new:true});
	return category;
};

export const deleteCategory = async (id, data) => {
	const category = await Category.findByIdAndDelete(id);
	return category;
};
export const getCategoryList = async (id, data) => {
	const categories = await Category.find();
	return categories;
};
