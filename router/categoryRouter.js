import express from "express";
import { addCatergory, deleteCategory, getAllCategory, updateCategory } from "../controller/categoryController.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, checkAdmin, addCatergory);
router.get("/", checkAuth, getAllCategory);
router.put("/:id", checkAuth, checkAdmin, updateCategory);
router.delete("/:id",checkAuth, checkAdmin, deleteCategory);

export default router;

