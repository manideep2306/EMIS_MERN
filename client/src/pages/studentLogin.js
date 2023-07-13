import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './loginpage.css'
import Dashboard from './Dashboard'

const StudentLogin = () => {
  const type='student'
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const LoginStudent = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:1337/api/studentlogin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
    
            },
            body: JSON.stringify({ email, password})
        });
        const data = await response.json();
        console.log(data);
       
        if(data.user!=''){
          alert('Login Successful');
          console.log(data.user)
          window.location.href=`/allvideo/${type}/${data.user[0]._id}`;
        }
        else{
          alert('Please check login credentials')
        }
    }
  return (
    <div className="page">
      
      <div className='login-box'>
      <h2>Student Login</h2>
      <form onSubmit={LoginStudent}>
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

export default StudentLogin