import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
const AddJob = () => {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('Dhaka')
    const [category, setCategory] = useState('Programming')
    const [level, setLevel] = useState('Beginner leval')
    const [salary, setSalary] = useState('0')
    const editorRef =useRef(null)
    const quillRef = useRef(null)
    useEffect(()=>{
          //Initiate Quill
        if (!quillRef.current && editorRef.current){
                 quillRef.current = new Quill(editorRef.current,{
                    theme:'snow'
                 })
        }

    },[])
    return (
        <form className="container p-4 flex flex-col w-full items-start gap-3">
            <div className="w-full">
                <p className="mb-2">Job Title</p>
                <input type="text" placeholder='Type here'
                    onChange={e => setTitle(e.target.value)} value={title}
                    required
                    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>
              <div className="w-full max-w-lg">
                <p className="my-2">Job Description</p>
                <div ref={editorRef}>

                </div>
              </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
              <div>
                <p>Job Catagory</p>
                <select onChange={e=> setCategory(e.target.value)}>
                    {JobCategories.map((catagory,index)=>(
                           <option key={index} value={category}>{catagory}</option>
                    ))}
                </select>
              </div>

              <div>
                <p>Job Location</p>
                <select onChange={e=> setLocation(e.target.value)}>
                    {JobLocations.map((location,index)=>(
                           <option key={index} value={location}>{location}</option>
                    ))}
                </select>
              </div>

              <div>
                <p>Job Level</p>
                <select onChange={e=> setLevel(e.target.value)}>
                    <option value="Beginner level">Beginner level</option>
                    <option value="Intermediate level">Intermediate level</option>
                    <option value="Senior level">Senior level</option>
                </select>
              </div>


            </div>
            <div>
                <p>Job Salary</p>
                <input onChange={e=> setSalary(e.target.value)} type="Number" placeholder="2500"/>
            </div>
            <button>ADD</button>
        </form> 

        
    )
}
export default AddJob