 import React, { useState } from "react";
  const RecruiterLogin = () => {
    const [state, setState]=useState('Login')
    const [name, setName]= useState('')
    const [password, setPassword]= useState('')
    const [email,setEmail] = useState('')
    const [image, setImage]= useState(false)
    const [isTextDataSubmited, setIsTextDataSubmited]= useState(false)
    return (
        <div>
          <form action="">
            <h1>Recruiter {state}</h1>
          </form>
        </div>
     
        )
    }
export default RecruiterLogin