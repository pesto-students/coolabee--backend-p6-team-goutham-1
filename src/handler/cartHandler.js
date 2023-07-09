import Express from "express";
import rejectBadRequests from "../utils/validationService.js";
import {
	getCartByCondition,
	createCart,
	getCartById,
	updateCart,
	getCartList
} from "../services/cart.js";

const Router = Express.Router();

Router.post("/createcart",rejectBadRequests, async (req, res) => {
	let existingCart = await getCartByCondition({
		title: req.body.title,
	});
	if (existingCart) {
		res.status(400).json({
			Message: `Cart With the Details : ${JSON.stringify(req.body)}, Already Exists`,
		});
	} else {
		let CartData = await createCart(req.body);
		res
			.status(200)
			.json({ Message: "Cart Created Successfully", CartData });
	}
});

Router.get("/carts",rejectBadRequests,async(req,res)=>{
	let cartList=await getCartList();
	if(cartList.length>0){
		res.status(200).json({List:cartList})
	}else{
		res.status(400).json({message:"Cart List Not Found."})
	}
})
Router.get("/cart",async(req,res)=>{
	let {id}=req.query;
	let cart=await getCartById({
		_id: id,
	});
	if(cart){
		res.status(200).json({List:cart})
	}else{
		res.status(400).json({message:"Cart Not Found."})
	}
})
Router.post("/updatecart",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingCart = await getCartByCondition({
		_id: id,
	});
	let {_id}=existingCart;
	if (existingCart) {
		let data=await updateCart(_id,{...req.body})
		res.status(200).json({message:"Cart updated.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Cart Found To Be Updated." });
	}
});
Router.patch("/deletecart",rejectBadRequests, async (req, res) => {
	let {id}=req.query;
	let existingCart = await getCartByCondition({
		_id: id,
	});
	let {_id}=existingCart;
	if (existingCart) {
		let data=await updateCart(_id,{status:false})
		res.status(200).json({message:"Cart deleted.",data})
	} else {
		res
			.status(200)
			.json({ Message: "No Cart Found To Be Updated." });
	}
});

export default Router;
