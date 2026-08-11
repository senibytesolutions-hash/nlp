import express from "express";
import { createContactMessage } from "../controllers/contactController.js";
import { contactValidationRules } from "../utils/validators.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", contactValidationRules, validateRequest, createContactMessage);

export default router;
