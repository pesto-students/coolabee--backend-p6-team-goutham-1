import Express from "express";
import { body } from "express-validator";
import rejectBadRequests from "../utils/validationService.js";
import {
	getProductByCondition,
	createProduct,
	getProductById,
	updateProduct,
} from "../services/product.js";

const Router = Express.Router();

Router.post("/createproduct", async (req, res) => {
	let existingProduct = await getProductByCondition({
		title: req.body.title,
	});
	if (existingProduct) {
		res.status(400).json({
			Message: `Product With the Name : ${req.body.productName}, Already Exists`,
		});
	} else {
		let ProductData = await createProduct(req.body);
		res
			.status(200)
			.json({ Message: "Category Created Successfully", ProductData });
	}
});

export default Router;
