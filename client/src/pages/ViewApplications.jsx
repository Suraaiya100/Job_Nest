import React, { useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  const [openAction, setOpenAction] = useState(null);

  return (
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
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img
                    src={applicant.imgSrc}
                    alt={applicant.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {applicant.name}
                </td>
                <td className="py-2 px-4">{applicant.jobTitle}</td>
                <td className="py-2 px-4">{applicant.location}</td>
                <td className="py-2 px-4">
                  <a
                    href={applicant.resume}
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
                      <button className="text-blue-600 hover:underline text-sm">
                        Accept
                      </button>
                      <button className="text-red-500 hover:underline text-sm">
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
