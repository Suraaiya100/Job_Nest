import Company from "../models/company.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// Register company
export const registerCompany = async (req, res) => {
    const { name, email, password } = req.body;
    const image = req.file;
    if (!name || !email || !password || !image) {
        return res.json({ success: false, message: "missing details" });
    }
    try {
        const companyExists = await Company.findOne({ email });
        if (companyExists) {
            return res.json({ success: false, message: "Company already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const imageUpload = await cloudinary.uploader.upload(image.path);
        const company = await Company.create({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url
        });

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        });

    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

// Company login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.json({ success: false, message: "Company not found" });
        }
        //const isMatch = 
        if (await bcrypt.compare(password, company.password))
        {
            res.json({
                success: true,
                company: {
                    id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};


// Get company profile
export const getCompanyProfile = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).select("-password");
        if (!company) {
            return res.json({ success: false, message: "Company not found" });
        }
        res.json({ success: true, company });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

// Post a job
export const postJob = async (req, res) => {
    const { title, description, salary, location, level, category } = req.body;
    const companyId = req.company._id; // <-- FIXED: use companyId
    try {
        const newJob = new Job({
            title,
            description,
            salary,
            location,
            companyId, // <-- use companyId
            date: Date.now(),
            level,
            category
        });
        await newJob.save();
        res.json({ success: true, newJob });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

// Get company data (for authenticated company)
export const getCompanyData = async (req, res) => {
    try {
        const company = req.company;
        res.json({ success: true, company });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

// Get applicants for a company's jobs
export const getCompanyJobApplicants = async (req, res) => {
    try {
        const companyId = req.company._id; // <-- FIXED: use companyId
        const applications = await JobApplication.find({ companyId }) // <-- FIXED: use companyId
        .populate("userId", "name resume image")
        .populate("jobId", "title salary location level category")
        .exec()
        res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all jobs posted by a company
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id; // <-- FIXED: use companyId
        const jobs = await Job.find({ companyId }); // <-- FIXED: use companyId
        const jobsData= await Promise.all(jobs.map(async(job)=>{
            const applicants= await JobApplication.find({jobId:job._id})
            return {...job.toObject(),applicants:applicants.length}
        }))
         res.json({ success: true, jobsData });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

// Change application status (stub)
export const ChangeApplicationStatus = async (req, res) => {
    try {
    const { id, status } = req.body;
    await JobApplication.findOneAndUpdate({ _id: id }, { status });
    res.json({ success: true, message: "Status updated" });
        
    } catch (error) {
        res.json({ success: false, message: error.message });
        
    }
    

};

// Change job visibility
export const changeVisibility = async (req, res) => {
    try {
        const { id } = req.body;
        const companyId = req.company._id;
        const job = await Job.findById(id);
        if (!job) {
            return res.json({ success: false, message: "Job not found" });
        }
        if (companyId.toString() === job.companyId.toString()) { // <-- FIXED: use companyId
            job.visible = !job.visible;
            await job.save();
            res.json({ success: true, job });
        } else {
            res.json({ success: false, message: "Not authorized" });
        }
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};