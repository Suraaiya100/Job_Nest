import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const [openAction, setOpenAction] = useState(null);
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  // fetch applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/company/job-applications",
        { headers: { token: companyToken } }
      );
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // update job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-application-status",
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
    // eslint-disable-next-line
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl"> No Applications Available</p>
    </div>
    ) : (
      <div className="p-8 w-full">
        <div className="bg-white rounded shadow border">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 font-medium text-gray-600">#</th>
                <th className="py-3 px-4 font-medium text-gray-600">User name</th>
                <th className="py-3 px-4 font-medium text-gray-600">Job Title</th>
                <th className="py-3 px-4 font-medium text-gray-600">Location</th>
                <th className="py-3 px-4 font-medium text-gray-600">Resume</th>
                <th className="py-3 px-4 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter(item => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <img
                        src={applicant.userId.image}
                        alt="/"
                        className="w-8 h-8 rounded-full"
                      />
                      {applicant.userId.name}
                    </td>
                    <td className="py-2 px-4">{applicant.jobId.title}</td>
                    <td className="py-2 px-4">{applicant.jobId.location}</td>
                    <td className="py-2 px-4">
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition flex items-center gap-1"
                      >
                        Resume
                        <img
                          src={assets.resume_download_icon}
                          alt="download"
                          className="w-4 h-4"
                        />
                      </a>
                    </td>
                    <td className="py-2 px-4 relative">
                      {applicant.status === "Pending" ? (
                        <>
                          <button
                            onClick={() =>
                              setOpenAction(openAction === index ? null : index)
                            }
                            className="text-gray-500 px-2"
                          >
                            ...
                          </button>
                          {openAction === index && (
                            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md flex flex-col gap-1 p-2 z-10">
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(applicant._id, "Accepted")
                                }
                                className="text-blue-600 hover:underline text-sm"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(applicant._id, "Rejected")
                                }
                                className="text-red-500 hover:underline text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div>{applicant.status}</div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;