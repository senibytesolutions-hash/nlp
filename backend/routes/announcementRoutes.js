import express from "express";
import { getActiveAnnouncements } from "../controllers/announcementController.js";

const router = express.Router();

router.get("/active", getActiveAnnouncements);

export default router;
