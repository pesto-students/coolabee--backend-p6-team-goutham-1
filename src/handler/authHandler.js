import Express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import rejectBadRequests from "../utils/validationService.js";
import {
	getUserByCondition,
	getUserPassword,
	createUser,
} from "../services/userService.js";
import * as dotenv from "dotenv";
dotenv.config();

const Router = Express.Router();

// TODO add proper validation
const loginBodyValidators = [
	body("email").notEmpty().withMessage("Email field is required."),
	body("password").notEmpty().withMessage("Password field is required."),
];

const signUpBodyValidators = [
	body("email").notEmpty().withMessage("Email field is required."),
	body("password").notEmpty().withMessage("Password field is required."),
	body("fullName").notEmpty().withMessage("FullName field is required."),
	body("phoneNumber").notEmpty().withMessage("PhoneNumber field is required."),
	// body("isVerified").notEmpty().withMessage("IsVerified field is required."),
	// body("isSuspended").notEmpty().withMessage("IsSuspended field is required."),
];

/**
 * SignUp
 */
Router.post(
	"/signup",
	signUpBodyValidators,
	rejectBadRequests,
	async (req, res) => {
		let {fullName,isAdmin,email,password,phoneNumber,profilePicture,isVerified,isSuspended,suspendedBy,suspendedAt}=req.body;
		const emailLowerCase = email.toLowerCase();
		let existingUser = await getUserByCondition({ email: req.body.email });
		if (existingUser) {
			res
				.status(400)
				.json({ Message: "User is already Existing with this email" });
		} else {
			
			const salt = await bcrypt.genSalt(10);

            let hasedPassword = await bcrypt.hash(req.body.password, salt);

			let userData = await createUser({fullName,isAdmin,email:emailLowerCase,password:hasedPassword,phoneNumber,profilePicture,isVerified,isSuspended,suspendedBy,suspendedAt});
			   let userDetails={
				name:userData.fullName,
				isAdmin:userData.isAdmin,
				email:userData.email,
				profilePic:userData.profilePicture,
				id:userData._id
			   }
			res.status(200).json({
				Message: "User Registered Successfully.",
				userDetails
			});
		}
	}
);

/**
 * login
 */
Router.post("/", loginBodyValidators, rejectBadRequests, async (req, res) => {
	const { email, password } = req.body;

	const emailLowerCase = email.toLowerCase();

	try {
		let user = await getUserByCondition({ email: emailLowerCase });

		if (!user) {
			return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
		}

		const userPassword = await getUserPassword({ _id: user._id });

		const isMatch = await bcrypt.compare(password, userPassword.password);

		if (!isMatch) {
			return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
		}

		if (user.isSuspended === true) {
			return res.status(401).json({
				errors: [
					{
						msg: "Your Account is not Suspended. Please contact admin for any queries.",
					},
				],
			});
		}

		const payload = {
			user: {
				id: user._id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET_KEY,
			// 4 days
			{ expiresIn: 345600 },
			(err, token) => {
				if (err) throw err;
				res.status(200).json({ token, user });
			}
		);

		return;
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ errors: [{ msg: "Server Error" }] });
	}
});

export default Router;
