import React from "react";
import { assets } from "../assets/assets";
const Hero = () => {
    return (
       <div className="container 2xl:px-20 mx:auto my-10">
        <div>
          <h2>Discover Your Next Opportunity</h2>
          <p>Find your dream job in tech, marketing, design and more</p>
          <div>
            <div>
                <img src={assets.search_icon} alt="" />
                <input type='text'
                placeholder="Search For jobs" 
                className="max-sm:text-xs p-2 runded outline-none w-full "/>
            </div>
            <div>
                <img src={assets.location_icon} alt="" />
                <input type='text'
                placeholder="Search For location" 
                className="max-sm:text-xs p-2 runded outline-none w-full "/>
            </div>
            <button>Search</button>
          </div>
        </div>
       </div>
    )
};
export default Hero