import express from "express";
import { userProtect } from "../middleware/userAuth.js";

import {
    applyforJob,
    getUserData,
    getUserJobApplications,
    updateUserResume
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get('/user', userProtect, getUserData);
router.post('/apply', userProtect, applyforJob);
router.get('/applications', userProtect, getUserJobApplications);
router.post('/update-resume', userProtect, upload.single('resume'), updateUserResume);

export default router;