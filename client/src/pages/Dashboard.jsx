import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
const Dashboard = () => {
    return (
        <div className='min-h-screen'>
            <div className="shadow py-4">
                <div>
                    <img src={assets.logo} alt=""/>
                    <div>
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