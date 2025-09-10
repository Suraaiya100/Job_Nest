import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
const Dashboard = () => {
    return (
        <div className='min-h-screen'>
            <div className="shadow py-4">
                <div className="px-5 flex justify-between items-center">
                    <img className="max-sm:w-32 cursor-pointer" src={assets.logo} alt=""/>
                    <div className="flex items-center gap-3">
                        <p>Welcome, JobNest</p>
                        <div>
                            <img src={assets.company_icon} alt=""/>
                            <div>
                                <ul>
                                    <li>Logout</li>
                                    
                                </ul>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
}
export default Dashboard;