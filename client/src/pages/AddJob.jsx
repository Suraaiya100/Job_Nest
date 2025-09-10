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
        <form>
            <div>
                <p>Job Title</p>
                <input type="text" placeholder='Type here'
                    onChange={e => setTitle(e.target.value)} value={title}
                    required
                />
            </div>
              <div>
                <p>Job Description</p>
                <div ref={editorRef}>

                </div>
              </div>

            <div>
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
        </form> 

        
    )
}
export default AddJob