import React from "react";
import { assets } from "../assets/assets";
const ApplyDownLoad = () => {
    return (
        <div className="container px-4 2xl:px-20 mx-auto my-20">
            <div className="relative bg-gradient-to-r from-purple-300 to-blue-300 rounded-lg text-white flex flex-col lg:flex-row items-center justify-between py-10 px-6 lg:px-20 gap-10">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-bold mb-8 max-w-md">Download Our App</h1>
                    <div className="flex gap-4">
                        <a href="#" className="ininline-block">
                            <img className="h-12" src={assets.play_store} alt="" />
                        </a>
                        <a href="#" className="ininline-block">
                            <img className="h-12" src={assets.app_store} alt="" />
                        </a>
                    </div>
                </div>
                <img  src={assets.app_main_img} alt="" />
            </div>
        </div>
    )
};
export default ApplyDownLoad 