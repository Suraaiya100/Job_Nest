import express from "express";
import { getJobs, getJobById } from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs); // GET /api/jobs
router.get("/:id", getJobById); // GET /api/jobs/:id

export default router;