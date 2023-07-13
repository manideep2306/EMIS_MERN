import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './loginpage.css'

const FacultyLoginforCourse = () => {
  const type="faculty";
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const LoginFaculty = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:1337/api/facultyloginforcourse", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
    
            },
            body: JSON.stringify({ email, password})
        });
        const data = await response.json();
        if(data.user!=''){
          alert('Login Successful');
          window.location.href=`/facultyhomepage/${type}/${data.user[0]._id}`;
        }
        else{
          alert('Please check login credentials')
        }
    }
  return (
    <div className="page">
      <div className='login-box'>
      <h2>Faculty Login</h2>
      <form onSubmit={LoginFaculty}>
       <label>Email</label>
        <input value={email}
          onChange={(e) => setEmail(e.target.value)} type="email"></input><br/>
          <label>Password</label>
        <input value={password}
          onChange={(e) => setPassword(e.target.value)} type="password"></input><br/>
          <input type="submit" value="Login" />
          <br></br>
      </form>
    </div>
    </div>
  )
}


export default FacultyLoginforCourse