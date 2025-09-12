import Company from "../models/company.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.js";
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
                id: company._id,
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
        const company = await Company
        if (bcrypt.compare(password, company.password)) {
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
        }
        else{
            res.json({ success: false, message: "Invalid credentials" });
        }}
         catch (error) {
        res.json({ success: false, message: "Server error" });

    }
    
}

export const getCompanyProfile = async (req, res) => {
    
};

export const postJob = async (req, res) => {
   const {title, description, salary, location, level, catgory} = req.body;
    const companyID = req.company._id
    try {
        const newJob =  Job({
            title, description, salary, location, companyID, date: Date.now(),level, category
        });
        await newJob.save();
        res.json({ success: true, newJob });
    } catch (error) {
        res.json({ success: false, message: "Server error"
        })
    }
    

};
export const getCompanyData = async (req, res) => {
      const company = req.company
      try{
        res.json({ success: true, company });
      } catch (error) {
        res.json({ success: false, message: "Server error" });
      }
}

export const getCompanyJobApplicants = async (req, res) => {
    
};

export const getCompanyPostedJobs = async (req, res) => {
    try{
        const companyID= req.company._id
        const jobs = await Job.find({companyID});
    
        res.json({ success: true, jobs });
      } catch (error) {
        res.json({ success: false, message: "Server error" });
      }
};

export const ChangeApplicationStatus = async (req, res) => {
}

export const changeVisibility = async (req, res) => {
    try{
        const {id} = req.body;
        const companyId = req.company._id;
        const job= await Job.findById(id);
        if(companyId.toString() !== job.companyID.toString()){
            job.visible = !job.visible;
        }
        
        await job.save();
        res.json({ success: true, job });
        } catch (error) {
        res.json({ success: false, message: "Server error" });

    }
};