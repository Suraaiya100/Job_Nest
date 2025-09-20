import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    salary: Number,
    location: {type: String, required: true},
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    visible: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
    level: { type: String, required: true },
    category: { type: String, required: true }

}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;