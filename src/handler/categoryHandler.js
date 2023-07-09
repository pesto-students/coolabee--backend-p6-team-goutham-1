import Express from "express";
import { body } from "express-validator";
import rejectBadRequests from "../utils/validationService.js";
import {
	getCategoryByCondition,
	createCategory,
	getCategoryById,
	updateCategory,
	getCategoryList
} from "../services/category.js";

const Router = Express.Router();

Router.post("/createcategory", async (req, res) => {
	let existingCategory = await getCategoryByCondition({
		title: req.body.title,
	});
	if (existingCategory) {
		res.status(400).json({
			Message: `Category With the Title : ${req.body.title}, Already Exists`,
		});
	} else {
		let CategoryData = await createCategory(req.body);
		res
			.status(200)
			.json({ Message: "Category Created Successfully", CategoryData });
	}
});
Router.get("/categories",rejectBadRequests,async(req,res)=>{
	let categoryList=await getCategoryList();
	if(categoryList.length>0){
		res.status(200).json({List:categoryList})
	}else{
		res.status(400).json({message:"Category List Not Found."})
	}
})
Router.get("/category",async(req,res)=>{
	let {id}=req.query;
	let category=await getCategoryById({
		_id: id,
	});
	if(category){
		res.status(200).json({category})
	}else{
		res.status(400).json({message:"Category Not Found."})
	}
})
Router.post("/updatecategory",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingProduct = await getCategoryByCondition({
		_id: id,
	});
	let {_id}=existingProduct;
	if (existingProduct) {
		let data=await updateCategory (_id,{...req.body})
		res.status(200).json({message:"category updated.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Category Found To Be Updated." });
	}
});
Router.patch("/deletecategory",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingProduct = await getCategoryByCondition({
		_id: id,
	});
	let {_id}=existingProduct;
	if (existingProduct) {
		let data=await updateCategory(_id,{status:false})
		res.status(200).json({message:"category deleted.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Category Found To Be Updated." });
	}
});

export default Router;
