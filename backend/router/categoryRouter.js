import express from "express";
import { addCatergory, deleteCategory, getAllCategory, updateCategory } from "../controller/categoryController.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkAuth from "../middlewares/checkAuth.js";
import validationHandler from "../middlewares/validationHandler.js";
import { categoryAddSchema } from "../model/category.js";
import { upload } from "./uploadRouter.js";

const router = express.Router();

router.post("/", checkAuth, checkAdmin, upload.single("image"), validationHandler(categoryAddSchema), addCatergory);
router.get("/", checkAuth, getAllCategory);
router.put("/:id", checkAuth, checkAdmin, updateCategory);
router.delete("/:id",checkAuth, checkAdmin, deleteCategory);

export default router;
