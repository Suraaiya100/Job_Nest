import User from "../models/User.js";
import Job from "../models/job.js";
import Application from "../models/application.js";

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
    try {
        const { jobId } = req.body;
        const application = await Application.create({
            user: req.user.id,
            job: jobId,
            status: "pending"
        });
        res.status(201).json({ success: true, application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get user's job applications
export const getUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user.id }).populate("job");
        res.status(200).json({ success: true, applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user resume
export const updateUserResume = async (req, res) => {
    try {
        const resumeUrl = req.file ? req.file.path : null;
        if (!resumeUrl) {
            return res.status(400).json({ success: false, message: "Resume upload failed" });
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { resume: resumeUrl },
            { new: true }
        );
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get user data (basic example)
export const getUserData = async (req, res) => {
    res.status(200).json({ success: true, message: "User data" });
};