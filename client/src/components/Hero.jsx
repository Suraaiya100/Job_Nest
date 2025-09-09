import React from "react";
import { assets } from "../assets/assets";
const Hero = () => {
    return (
       <div className="container 2xl:px-20 mx:auto my-10">
        <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white py-16 text-center mx-2 rounded-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Discover Your Next Opportunity</h2>
          <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">Find your dream job in tech, marketing, design and more</p>
          <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
            <div className="flex items-center">
                <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
                <input type='text'
                placeholder="Search For jobs" 
                className="max-sm:text-xs p-2 runded outline-none w-full "/>
            </div>
            <div className="flex items-center">
                <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
                <input type='text'
                placeholder="Search For location" 
                className="max-sm:text-xs p-2 runded outline-none w-full "/>
            </div>
            <button className="bg-blue-600 px-6 py-2 rounded text-white m-1">Search</button>
          </div>
        </div>
       </div>
    )
};
export default Hero