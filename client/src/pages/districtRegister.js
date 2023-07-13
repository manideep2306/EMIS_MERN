import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './loginpage.css'

const DistrictRegister = () => {
    const {id,type}=useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dist,setDist]=useState('')
    async function registerDist(event){
        event.preventDefault();
        const response=await fetch(`http://localhost:1337/api/districtregister/${type}/${id}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            name,
            email,
            password,
            dist
          }),
        })
        const data = await response.json()
        if(data.status==='ok'){
          alert("District Head registered succesfully")
          window.location.href=`/dashboard/${type}/${id}`
        }
        else{
            alert("Not registered!!! Check details once again")
        }
      }
  return (
    <div className='page'>
      <div className='login-box'>
        <h2>Register District Head </h2>
        <form onSubmit={registerDist}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"></input><br/>
            <label>Email</label>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)} type="email"></input><br/>
            <label>Password</label>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)} type="password" ></input><br/>
           <label>District</label>
            <input value={dist} onChange={(e)=>setDist(e.target.value)} type="text"></input>
            <br></br>
           
            <input type="submit" value="Register" />
            </form>
            </div>
    </div>
  )
}

export default DistrictRegister