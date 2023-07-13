import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios';
import './loginpage.css'

const EditSchool = () => {
    const {id,editid,type}=useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [distr,setDistr]=useState('')
    const [alldist,setAllDist]=useState([]);
    const [distid,setDistId]=useState('')
    const navigat=useNavigate();
    const url='http://localhost:1337/api';
    const url2='http://localhost:3000'
    useEffect(()=>{
    async function get(){
      try{
        let response=await axios.get(`${url}/school/${type}/${editid}`);
        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setPassword(response.data[0].password);
        setDistr(response.data[0].distr);
        setDistId(response.data[0].distid);
      }
      catch(error){
        console.log("error while getting student details in edit",error);
      }
    }
    get();
    async function getDists(){
      try {
        
        let response = await axios.get(`http://localhost:1337/api/alldistricts/${type}/${id}`);
        console.log(response.data)
        setAllDist(response.data)
      }
      catch (error) {
        console.log("Error while fetching all districts", error)
      }
    }
    getDists();
    },[]);
    async function editSchl(){
      const School={name,email,password,distr,distid};
      console.log("before axios");
      const response=await axios.put(`${url}/editschl/${type}/${editid}`,School);
      if(response){
        alert("Updated Successfully");
        window.location.href = `${url2}/allschool/${type}/${id}`
      }
      //window.location.href=`/alldistrict/${id}`
    }
  return (
    <div className='page'>
      <div className='login-box'>
        <h2>Edit School Head </h2>
        <form onSubmit={editSchl}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" placeholder="Name"></input><br/>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input><br/>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"></input><br/>
            <select value={[distid,distr]} onChange={
            (e)=>{
              const [did,dname]=e.target.value.split(",");
              setDistId(did);
              setDistr(dname);
              }}>
                <option>---select district----</option>
        {alldist.map((d) => (
          <option value={[d._id,d.dist]} key={d._id}>{d.dist}</option>
        ))}
      </select>
            <input type="submit" value="Submit" />
            </form>
            </div>
    </div>
  )
}

export default EditSchool