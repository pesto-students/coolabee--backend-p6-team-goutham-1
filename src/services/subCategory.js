import SubCategory from "../model/SubCategory.js";

export const getSubCategoryById = async (_id) => {
	const subcategory = await SubCategory.findOne({ _id });
	return subcategory;
};

export const getSubCategoryByCondition = async (condition) => {
	const subcategory = await SubCategory.findOne({ ...condition });
	return subcategory;
};

export const createSubCategory = async (data) => {
	const { ...varData } = data;
	const subcategory = await SubCategory.create({ ...varData });
	return subcategory;
};

export const updateSubCategory = async (id, data) => {
	const { ...varData } = data;
	const subcategory = await SubCategory.findByIdAndUpdate(id, { ...varData },{new:true});
	return subcategory;
};

export const deleteSubCategory = async (id, data) => {
	// let { id } = id;
	let subcategorydata = await SubCategory.findByIdAndDelete(id);
	return subcategorydata;
};
export const getSubCategoryList = async (id, data) => {
	const subcategories = await SubCategory.find();
	return subcategories;
};
