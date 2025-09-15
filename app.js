import express from "express"
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js"
import recipeRouter from "./router/recipeRouter.js"
import commentRouter from "./router/commentRouter.js"
import categoryRouter from "./router/categoryRouter.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/comments", commentRouter);
app.use("/api/category", categoryRouter);

export default app;