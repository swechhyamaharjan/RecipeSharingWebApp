import express from "express"
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js"
import recipeRouter from "./router/recipeRouter.js"
import commentRouter from "./router/commentRouter.js"
import categoryRouter from "./router/categoryRouter.js"
import contactRouter from "./router/contactRouter.js"
import notificationRouter from "./router/notificationRouter.js"
import cors from "cors";

const app = express();

app.use(cookieParser());

app.use(express.json());



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/comments", commentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/contact", contactRouter);
app.use("/api/notifications", notificationRouter);


export default app;