import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios';
import './loginpage.css'

const EditDistrict = () => {
    const {id,editid,type}=useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dist,setDist]=useState('')
    const navigat=useNavigate();
    const url='http://localhost:1337/api';
    const url2='http://localhost:3000'
    useEffect(()=>{
    async function get(){
      try{
        let response=await axios.get(`${url}/district/${type}/${editid}`);
        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setPassword(response.data[0].password);
        setDist(response.data[0].dist);
      }
      catch(error){
        console.log("error while getting student details in edit",error);
      }
    }
    get();
    },[]);
    async function editDist(){
      const District={name,email,password,dist};
      console.log("before axios");
      const response=await axios.put(`${url}/editdist/${type}/${editid}`,District);
      if(response){
        alert("Updated Successfully");
      window.location.href = `${url2}/alldistrict/${type}/${id}`
      }
      //window.location.href=`/alldistrict/${id}`
    }
  return (
    <div className='page'>
    <div className='login-box'>
        <h2>Edit District Head </h2>
        <form onSubmit={editDist}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" ></input><br/>
            <label>Email</label>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)} type="email" ></input><br/>
            <label>Password</label>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)} type="password" ></input><br/>
           <label>District</label>
            <input value={dist} onChange={(e)=>setDist(e.target.value)} type="text"></input>
            <br></br>
           
            <input type="submit" value="Submit" />
            </form>
            </div>
    </div>
  )
}

export default EditDistrict