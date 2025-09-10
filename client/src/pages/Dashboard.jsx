import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
const Dashboard = () => {
    return (
        <div className='min-h-screen'>
            <div>
                <div>
                    <img src={assets.logo} alt=""/>
                    <div>
                        <p>Welcome, JobNest</p>
                        <div>
                            <img src={assets.company_icon} alt=""/>
                            <div>
                                <ul>
                                    <li>Dashboard</li>
                                    <li>Manage Jobs</li>
                                    <li>Add Job</li>
                                    <li>View Applications</li>
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