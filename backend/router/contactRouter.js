import express from "express"
import sendContact from "../controller/contactController.js";

const router = express.Router();

router.post("/sendContact", sendContact);

export default router;

