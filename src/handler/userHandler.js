import Express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import auth from '../middleware/authMiddlerware.js';
import rejectBadRequests from '../utils/validationService.js';
import { getUserByCondition, createUser, getUserById, updateUser } from '../services/userService.js';
import Sib from 'sib-api-v3-sdk';

const Router = Express.Router();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
// TODO
// apiKey.apiKey = process.env.SENDINBLUE_API_KEY


// TODO check body validators
const userRegisterBodyValidators = [
    body("fullName").notEmpty().withMessage("Full Name is required"),
    body("phoneNumber").notEmpty().withMessage("Phone Number is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

// TODO check body validators
const userForgotPasswordBodyValidators = [
    body("email").notEmpty().withMessage("Email is required"),
];

// TODO check body validators
const userResetPasswordBodyValidators = [
    body("token").notEmpty().withMessage("Token is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

// TODO check with goutham
// TODO check body validators
// TODO
// body("profilePicture").withMessage("Profile picture should be uploaded"),
// TODO
// body("isVerified").withMessage("Email is required"),
// body("fullName").withMessage("Full Name should be a string"),
// body("email").withMessage("Email should be a string"),
const userEditBodyValidators = [
];


const API_URL = "http://localhost:3000";

const safeGuardingUserData = (data) => {
    const { isAdmin, isSuspended, suspendedBy, suspendedAt, ...varData } = data;
    return varData;
}

/**
 * create a user
 */
Router.post(
    "/",
    userRegisterBodyValidators,
    rejectBadRequests,
    async (req, res) => {
        console.log("Yesssss")

        const { email, phoneNumber,fullName } = req.body;

        console.log("FullName",fullName)

        try {
            let user = await getUserByCondition({ email });

            if (user) {
                res.status(409).json({
                    error: [{ msg: "User already Exists with this email address." }],
                });
                return;
            }

            user = await getUserByCondition({ phoneNumber });

            if (user) {
                res.status(409).json({
                    error: [{ msg: "User already Exists with this phone number." }],
                });
                return;
            }

            const salt = await bcrypt.genSalt(10);

            let hasedPassword = await bcrypt.hash(req.body.password, salt);

            console.log("HasedPassword ",hasedPassword)
           
            user = await createUser(safeGuardingUserData({fullName,...req.body}));

            if (!user._id) {
                return res.status(400).json({ errors: [{ msg: "Some Error occured while creating User." }] });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            const { password, ...userVar } = user._doc;

            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY,
                // 4 days
                { expiresIn: 345600 },
                (err, token) => {
                    if (err) throw err;
                    res.status(201).json({ token, user: userVar });
                }
            );

            return;
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    }
);

/**
 * Update User api
 */
Router.patch(
    "/",
    auth,
    userEditBodyValidators,
    rejectBadRequests,
    async (req, res) => {
        try {
            let user = await getUserById(req.user.id);

            if (!user) {
                return res.status(404).send({ errors: [{ msg: "No user found with this id." }] });
            }

            user = await updateUser(user._id, safeGuardingUserData(req.body));

            return res.status(200).json({ user });

        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    });


/**
 * forgot password requests
 */
Router.post(
    "/forgot-password",
    userForgotPasswordBodyValidators,
    rejectBadRequests,
    async (req, res) => {
        try {
            const user = await getUserByCondition({ email: req.body.email });

            if (!user) {
                res.status(400).json({ errors: [{ msg: "No user found with provided email address." }] })
            } else {
                const payload = {
                    user: {
                        id: user._id,
                    },
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "4h" });

                const tranEmailApi = new Sib.TransactionalEmailsApi()
                const sender = {
                    email: '',
                    name: 'Coolabee',
                }
                const receivers = [
                    {
                        email: user.email,
                    },
                ]

                tranEmailApi
                    .sendTransacEmail({
                        sender,
                        to: receivers,
                        subject: `Reset Password for ${user.fullName}`,
                        htmlContent:
                            `<p>Below is your password reset link <br/> 
                        <a clicktracking="off" href="${API_URL}/reset-password?token=${token}" >
                        click here</a> <br/>
                        This link is only valid for 4 hours </p>`,
                    })


                // TODO
                return res.status(200).json({ msg: "Email with reset link has been sent to registered email address", token });

                // TODO
                //     return res.status(400).json({ errors: [{ msg: "Some error occurred while sending email. Please try again or contact admin" }] });

            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    })

/**
 * reset password
 */
Router.patch(
    "/reset-password",
    userResetPasswordBodyValidators,
    rejectBadRequests,
    async (req, res) => {
        const token = req.body.token;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userid = decoded.user.id;

            let user = await getUserById(userid);

            if (!user) {
                res.status(400).json({ errors: [{ msg: "Unable to authenticate token. Please initiate a new forgot password request" }] })
            }

            const salt = await bcrypt.genSalt(10);

            const password = await bcrypt.hash(req.body.password, salt);

            user = await updateUser(userid, { password });

            return res.status(200).json({ msg: 'Password updated successfully.' });

        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    })

export default Router;
