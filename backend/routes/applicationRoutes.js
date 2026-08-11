import express from "express";
import { createApplication } from "../controllers/applicationController.js";
import { applicationValidationRules } from "../utils/validators.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", applicationValidationRules, validateRequest, createApplication);

export default router;
