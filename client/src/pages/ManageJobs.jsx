import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { useState,useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
const ManageJobs = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([]);
    const {backendUrl, companyToken}= useContext(AppContext)
    // fetch applications data
    const fetchCompanyJobs= async()=>{
        try {
            const {data}= await axios.get(backendUrl+'/api/company/list-jobs',{headers:{token:companyToken}})
            if(data.success){
                setJobs(data.jobsData.reverse())
                console.log(data.jobsData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    //function to change job visibility
    const changeJobVisibility= async(id)=>{
        try {
            const {data}= await axios.patch(backendUrl+'/api/company/change-job-visibility',
                {id},
                {headers:{token:companyToken}})
            if(data.success){
                toast.success(data.message)
                fetchCompanyJobs()
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if (companyToken){
            fetchCompanyJobs()
        }
    },[companyToken])



    return (
        <div className="p-8 w-full">
            <div className="bg-white rounded shadow border mb-8">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 px-4 font-medium text-gray-600">#</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Job Title</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Date</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Location</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Applicants</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{idx + 1}</td>
                                <td className="py-2 px-4">{job.title}</td>
                                <td className="py-2 px-4">{moment(job.title).format('ll')}</td>
                                <td className="py-2 px-4">{job.location}</td>
                                <td className="py-2 px-4">{job.applicants}</td>
                                <td className="py-2 px-4">
                                    <input onChange={()=>changeJobVisibility(job._id)} type="checkbox" checked={job.visible} readOnly className="accent-blue-600 w-5 h-5" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={()=> navigate('/dashboard/add-job')} className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                Add new job
            </button>
        </div>
    );
};

export default ManageJobs;