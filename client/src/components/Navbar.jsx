import React from "react";
import { assets } from "../assets/assets"
const Navbar = () => {
    return (
       <div>
        <div>
            <img src={assets.logo} alt="" />
            <div>
                <button>Recruiter Login</button>
                <button>Login</button>
            </div>
        </div>
       </div>
    )
};
export default Navbar