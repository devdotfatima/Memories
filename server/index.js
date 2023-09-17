import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const corsOptions = {
	origin: "https://memories-frontend-mern.web.app",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
	res.send("APP IS RUNNING");
});
const PORT = process.env.PORT || 7002;

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`server running ${PORT}`);
		})
	)
	.catch((error) => console.log(error.message));
// console.log('s')

// mongoose.set('useFindAndModify',false);
