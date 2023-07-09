import Express from "express";
import { body } from "express-validator";
import rejectBadRequests from "../utils/validationService.js";
import {
	getSubCategoryByCondition,
	createSubCategory,
	getSubCategoryById,
	updateSubCategory,
	getSubCategoryList
} from "../services/subCategory.js";

const Router = Express.Router();

Router.post("/createsubcategory", async (req, res) => {
	let existingSubCategory = await getSubCategoryByCondition({
		title: req.body.title,
	});
	if (existingSubCategory) {
		res.status(400).json({
			Message: `Sub Category With the Title : ${req.body.title}, Already Exists`,
		});
	} else {
		let subCategoryData = await createSubCategory(req.body);
		res
			.status(200)
			.json({ Message: "Sub Category Created Successfully", subCategoryData });
	}
});
Router.get("/subcategories",rejectBadRequests,async(req,res)=>{
	let subcategoryList=await getSubCategoryList();
	if(subcategoryList.length>0){
		res.status(200).json({List:subcategoryList})
	}else{
		res.status(400).json({message:"Sub Category List Not Found."})
	}
})
Router.get("/subcategory",async(req,res)=>{
	let {id}=req.query;
	let subcategory=await getSubCategoryById({
		_id: id,
	});
	if(subcategory){
		res.status(200).json({subcategory})
	}else{
		res.status(400).json({message:"Sub Category Not Found."})
	}
})
Router.post("/updatesubcategory",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingProduct = await getSubCategoryByCondition({
		_id: id,
	});
	let {_id}=existingProduct;
	if (existingProduct) {
		let data=await updateSubCategory (_id,{...req.body})
		res.status(200).json({message:"Sub category updated.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Category Found To Be Updated." });
	}
});
Router.patch("/deletesubcategory",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingProduct = await getSubCategoryByCondition({
		_id: id,
	});
	let {_id}=existingProduct;
	if (existingProduct) {
		let data=await updateSubCategory(_id,{status:false})
		res.status(200).json({message:"Sub category deleted.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Sub category Found To Be Updated." });
	}
});

export default Router;
