import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import ApplyDownLoad from "../components/AppDownload";
const Home = () => {
    return (
       <div>
        <Navbar/>
        <Hero/>
        <JobListing/>
        <ApplyDownLoad/>
       </div>
    )
};
export default Home;