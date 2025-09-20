import Job from "../models/Job.js"; // Fix: filename should be Job.js (case-sensitive on some systems)

// Get job by ID
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id)
            .populate({
                path: 'companyId', // <-- use companyId
                select: '-password'
            });
        if (!job) {
            return res.json({
                success: false,
                message: "Job not found"
            });
        }
        res.json({
            success: true,
            job
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({
                path: 'companyId', // <-- FIXED: use companyId
                select: '-password'
            });
        res.json({
            success: true,
            jobs
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};