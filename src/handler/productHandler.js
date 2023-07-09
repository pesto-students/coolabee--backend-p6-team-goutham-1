import Express from "express";
import rejectBadRequests from "../utils/validationService.js";
import {
	getProductByCondition,
	createProduct,
	getProductById,
	updateProduct,
	getProductList
} from "../services/product.js";

const Router = Express.Router();

Router.post("/createproduct",rejectBadRequests, async (req, res) => {
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

Router.get("/products",rejectBadRequests,async(req,res)=>{
	let productList=await getProductList();
	if(productList.length>0){
		res.status(200).json({List:productList})
	}else{
		res.status(400).json({message:"Product List Not Found."})
	}
})
Router.get("/product",async(req,res)=>{
	let {id}=req.query;
	let product=await getProductById({
		_id: id,
	});
	if(product){
		res.status(200).json({List:product})
	}else{
		res.status(400).json({message:"Product Not Found."})
	}
})
Router.post("/updateproduct",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingProduct = await getProductByCondition({
		_id: id,
	});
	let {_id}=existingProduct;
	if (existingProduct) {
		let data=await updateProduct(_id,{...req.body})
		res.status(200).json({message:"product updated.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Product Found To Be Updated." });
	}
});
Router.patch("/deleteproduct",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingProduct = await getProductByCondition({
		_id: id,
	});
	let {_id}=existingProduct;
	if (existingProduct) {
		let data=await updateProduct(_id,{status:false})
		res.status(200).json({message:"product deleted.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Product Found To Be Updated." });
	}
});

export default Router;
