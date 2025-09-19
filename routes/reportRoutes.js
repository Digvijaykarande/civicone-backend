import express from "express";
import multer from "multer";
import path from "path";
import {
  createReport,
  getReports,
  getReportById,
  updateReportStatus
} from "../controllers/reportController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

// routes
router.post("/", protect, upload.single("image"), createReport);
router.get("/", getReports);
router.get("/:id", getReportById);
router.put("/:id/status", protect, adminOnly, updateReportStatus);

export default router;
