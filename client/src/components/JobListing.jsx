import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext)
    return (
        <div>
            {/*Side bar*/}

            <div>
                {/*Search from hero component*/}
                {
                    isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
                        <>
                            <h3>Current Search</h3>
                            <div>
                                {searchFilter.title && (
                                    <span>
                                        {searchFilter.title}
                                        <img onClick={e=> setSearchFilter(prev=>({...prev,title:""}))} className="curson-pointer" src={assets.cross_icon} alt="" />
                                    </span>)}
                                {searchFilter.location && (
                                    <span>
                                        {searchFilter.location}
                                        <img onClick={e=> setSearchFilter(prev=>({...prev,location:""}))} className="curson-pointer" src={assets.cross_icon} alt="" />
                                    </span>)}
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
};
export default JobListing