import { createContext , useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()
export const AppContextProvider = (props) =>{
    const backendURL= import.meta.env.VITE_BACKEND_URL
    const[searchFilter,setSearchFilter]= useState({
        title:"",
        location:"",
    })
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin]=useState(false)
    const [companyToken, setCompanyToken]= useState(null)
    const [companyData, setCompanyData]= useState(null)

    //fetch job data
    const fetchJobs = async()=>{
         setJobs(jobsData)
         

    }
    // fetch company data
    const fetchCompanyData= async()=>{
        try {
            const {data}= await axios.get(backendURL+'/api/company/company',{headers:{token:companyToken}})
            if(data.success){
                setCompanyData(data.company)
                console.log(data)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        fetchJobs()
        const storedCompanyToken= localStorage.getItem('companyToken')
        if (storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }
    },[])

    useEffect(()=>{
     if(companyToken){
       fetchCompanyData()
     } 
    },[companyToken])

    const value ={
        searchFilter,setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendURL

    }
    return(<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}