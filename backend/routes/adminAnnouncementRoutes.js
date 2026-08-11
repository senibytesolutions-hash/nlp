import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  toggleAnnouncementActive,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllAnnouncements);
router.post("/", createAnnouncement);
router.put("/:id", updateAnnouncement);
router.patch("/:id/toggle", toggleAnnouncementActive);
router.delete("/:id", deleteAnnouncement);

export default router;
