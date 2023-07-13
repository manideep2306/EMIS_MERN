import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './loginpage.css'

const Scholarshipdetails = () => {
    const url='localhost:3000'
    const {type,id}=useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alldist,setAllDist]=useState([]);
    const [distr,setDistr]=useState('');
    const [distid,setDistId]=useState('')
    function scholarship(){
        alert("Submitted Succesfully..!!")
    }
  return (
    <div className='page'>
      <div className='login-box2'>
        <h2>Scholarship Details </h2>
        <form onSubmit={scholarship}>
          <label>Enter Name of Bank Holder</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" ></input><br/>
            <label>Enter Account Number</label>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)} type="number" ></input><br/>
            <input type="submit" value="Submit" />
            </form>
            </div>
            </div>
  )
}

export default Scholarshipdetails