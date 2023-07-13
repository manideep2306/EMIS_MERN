import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './loginpage.css'

const Login = () => {
    const type="admin";
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
 async function LoginUser(event){
    event.preventDefault();
    const response=await fetch('http://localhost:1337/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        
        email,
        password,
      }),
    })
    const data = await response.json()
    if(data.user!=''){
      alert('Login Successful');
      window.location.href=`/dashboard/${type}/${data.user[0]._id}`;
    }
    else{
      alert('Please check login credentials')
    }
  }

  return (
    <div className="page">
      <div className='login-box'>
      <h2>Admin Login</h2>
      <form onSubmit={LoginUser}>
       <label>Email</label>
        <input value={email}
          onChange={(e) =>{ setEmail(e.target.value);console.log(e.target.value)}} type="email" ></input><br/>
          <label>Password</label>
        <input value={password}
          onChange={(e) => {setPassword(e.target.value);console.log(e.target.value)}} type="password"></input><br/>
          <input type="submit" value="Login" />
      </form>
      </div>
    </div>
  )
}

export default Login