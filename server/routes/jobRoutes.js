import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getJobById, getJobs } from "../controllers/jobController.js"; 

const router = express.Router();

// job by id
router.get('/:id', protect, getJobById);

// job data
router.get('/', getJobs);

export default router;