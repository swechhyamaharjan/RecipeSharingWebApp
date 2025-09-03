import express from "express"
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js"
import recipeRouter from "./router/recipeRouter.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);

export default app;