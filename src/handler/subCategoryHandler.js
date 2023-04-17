import Express from "express";
import { body } from "express-validator";
import rejectBadRequests from "../utils/validationService.js";
import {
	getSubCategoryByCondition,
	createSubCategory,
	getSubCategoryById,
	updateSubCategory,
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

export default Router;
