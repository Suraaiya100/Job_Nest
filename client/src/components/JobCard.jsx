import React from "react";
import { assets } from "../assets/assets";
const JobCard = ({ job }) => {
    return (
        <div className="border p-6 shadow rounded">
            <div className="flex justify-between items-center">
                <img className="h-8" src={assets.company_icon} alt="" />
            </div>
            <h4 className="font-medium text-xl mt-2">{job.title}</h4>
            <div>
                <span>{job.location}</span>
                <span>{job.level}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
            <div>
                <button>Apply Now</button>
                <button>Learn more</button>
            </div>
        </div>
    )
};
export default JobCard