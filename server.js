import Express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authHandler from "./src/handler/authHandler.js";
import userHandler from "./src/handler/userHandler.js";
import categoryHandler from "./src/handler/categoryHandler.js";
import subCategoryHandler from "./src/handler/subCategoryHandler.js";
import productHandler from "./src/handler/productHandler.js";
const app = Express();

const appName = "Coolabee Backend";
const port = process.env.PORT || 4000;

const isDevelopment = port.toString().includes("4000");

const mongoUrl = isDevelopment
	? "mongodb+srv://coolabeeDB:coolabee%40123@cluster0.wzov3ob.mongodb.net/myFirstDatabase?authMechanism=DEFAULT"
	: "mongodb+srv://coolabeeDB:coolabee%40123@cluster0.wzov3ob.mongodb.net/myFirstDatabase?authMechanism=DEFAULT";

//mongoose connection
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
	console.log("MongoDB connected successfully");
});

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization,Content-Disposition, x-auth-token"
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET,POST, PUT, DELETE, OPTIONS, PATCH"
	);
	if (req.method === "OPTIONS") {
		return res.send();
	}
	next();
});

// TODO delete
// app.post("/api/auth", async(req,res) => {
//   console.log(req.body)
//   return ''
// });

app.use("/api/auth", authHandler);
app.use("/api/user", userHandler);
app.use("/api/category", categoryHandler);
app.use("/api/subcategory", subCategoryHandler);
app.use("/api/product", productHandler);

//listen
app.listen(port, () => {
	console.log(`${appName} listening on port ${port}`);
});
