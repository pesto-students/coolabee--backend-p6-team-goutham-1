import Express from "express";
import { body } from "express-validator";
import rejectBadRequests from "../utils/validationService.js";
import {
	getCategoryByCondition,
	createCategory,
	getCategoryById,
	updateCategory,
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

export default Router;
