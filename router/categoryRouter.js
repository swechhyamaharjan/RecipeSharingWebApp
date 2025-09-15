import express from "express";
import { addCatergory, deleteCategory, getAllCategory, updateCategory } from "../controller/categoryController.js";
import checkAdmin from "../middlewares/checkAdmin.js";

const router = express.Router();

router.post("/", checkAdmin, addCatergory);
router.get("/:id", checkAdmin, getAllCategory);
router.put("/:id", checkAdmin, updateCategory);
router.delete("/:id", checkAdmin, deleteCategory);

export default router;

