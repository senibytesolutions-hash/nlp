import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getApplications,
  getApplicationStats,
  getApplicationById,
  updateApplicationStatus,
  updateApplicationFeesStatus,
  addApplicationNote,
  deleteApplication,
} from "../controllers/adminApplicationController.js";

const router = express.Router();

router.use(protect);

router.get("/stats", getApplicationStats);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.patch("/:id/status", updateApplicationStatus);
router.patch("/:id/fees-status", updateApplicationFeesStatus);
router.post("/:id/notes", addApplicationNote);
router.delete("/:id", deleteApplication);

export default router;