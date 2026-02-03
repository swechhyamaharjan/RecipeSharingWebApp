import express from "express";
import { addCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controller/categoryController.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkAuth from "../middlewares/checkAuth.js";
import validationHandler from "../middlewares/validationHandler.js";
import { categoryAddSchema } from "../model/category.js";
import { upload } from "./uploadRouter.js";

const router = express.Router();

router.post("/", checkAuth, checkAdmin, upload.single("image"), validationHandler(categoryAddSchema), addCategory);
router.get("/", getAllCategory);
router.get("/:id", checkAuth, getCategoryById);
router.put("/:id", checkAuth, checkAdmin,upload.single("image"), updateCategory);
router.delete("/:id",checkAuth, checkAdmin, deleteCategory);

export default router;
