import express from "express";
import {
    registerCompany,
    loginCompany,
    getCompanyProfile,
    postJob,
    getCompanyJobApplicants,
    getCompanyPostedJobs,
    ChangeApplicationStatus,
    changeVisibility,
    getCompanyData // <-- Make sure this is imported!
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protect as protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single('image'), registerCompany);
router.post("/login", loginCompany);
router.get('/company', protectCompany, getCompanyData);
router.get("/profile/:id", getCompanyProfile);
router.post("/post-job", protectCompany, postJob);
router.get("/applicants", protectCompany, getCompanyJobApplicants);
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);
router.patch("/change-status", protectCompany, ChangeApplicationStatus);
router.patch("/change-visibility", protectCompany, changeVisibility);

export default router;