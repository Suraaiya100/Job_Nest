import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories } from "../assets/assets";
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
            </div>
        </form> 

        
    )
}
export default AddJob