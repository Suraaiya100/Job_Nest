import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
    return (
       <div>
        <img src={assets.logo} alt="" />
        <p>Copyright @JobNest.dev | All right reserved.</p>
        <div>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
        </div>
       </div>
    )
};
export default Footer