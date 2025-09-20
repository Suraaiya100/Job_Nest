import User from "../models/User.js";
import Job from "../models/Job.js"; // Fix: Use correct case for Job model import
import JobApplication from "../models/JobApplication.js";
import {v2 as cloudinary} from "cloudinary";
// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Apply for a job
export const applyforJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user.id; // Use req.user.id if using your own auth middleware

    try {
        const isAlreadyApplied = await JobApplication.findOne({ userId, jobId });
        if (isAlreadyApplied) {
            return res.json({ success: false, message: "You have already applied for this job" });
        }
        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return res.json({ success: false, message: "Job not found" });
        }
        await JobApplication.create({
            companyId: jobData.companyId, // <-- FIXED: use companyId
            userId,
            jobId,
            date: Date.now()
        });
        res.json({ success: true, message: "Job application successful" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get user's job applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await JobApplication.find({ userId }).
        populate("companyId", "name email image")
        .populate("jobId", "title description salary location level category")
        .exec()
        if (!applications) {
            return res.json({ success: false, message: "No applications found" });
        }
        res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update user resume
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.user.id; // <-- FIXED: use req.user.id
        const resumeFile = req.file;
        const userdata= await User.findById(userId)
        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userdata.resume= resumeUpload.secure_url
        }
        await userdata.save()
        return res.json({ success: true, message: "Resume updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Get user data (basic example)
export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};