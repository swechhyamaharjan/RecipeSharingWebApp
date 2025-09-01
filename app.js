import express from "express"
import userRouter from "./router/userRouter.js"

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

export default app;