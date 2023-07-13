import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios';
import './loginpage.css'

const EditStudent = () => {
    const {id,editid,type}=useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [study,setStudy]=useState('')
    const [school,setSchool]=useState('')
    const [aggr,setAggr]=useState('')
    const [gender,setGender]=useState('')
    const [alldist,setAllDist]=useState([]);
    const [allschl,setAllSchl]=useState([]);
    const [dist,setDist]=useState('')
    const [distid,setDistId]=useState('')
    const [schoolid,setSchoolID]=useState('')
    const navigat=useNavigate();
    var response1;
    const url='http://localhost:1337/api';
    const url2='http://localhost:3000'
    useEffect(()=>{
    async function get(){
      try{
        let response=await axios.get(`${url}/student/${type}/${editid}`);
        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setPassword(response.data[0].password);
        setStudy(response.data[0].study);
        setSchool(response.data[0].school);
        setAggr(response.data[0].aggr);
        setGender(response.data[0].gender);
        setDist(response.data[0].dist)
        setDistId(response.data[0].distid)
        setSchoolID(response.data[0].schoolid)
      }
      catch(error){
        console.log("error while getting student details in edit",error);
      }
    }
    get();
    async function getDists() {
      try {
        if(type=='admin' || type=='distr'){
          let response = await axios.get(`http://localhost:1337/api/alldistricts/${type}/${id}`);
        console.log(response.data)
        setAllDist(response.data)
        }
        else{
          let x='admin'
          response1=await axios.get(`http://localhost:1337/api/school/${type}/${id}`)
          console.log(response1.data)
          const newid=response1.data[0].distid;
          let response2=await axios.get(`http://localhost:1337/api/district/${x}/${newid}`)
          setAllDist(response2.data)
          setAllSchl(response1.data)
          console.log(response2.data)
        }
      }
      catch (error) {
        console.log("Error while fetching all districts", error)
      }
    }
    getDists();
    },[]);
    useEffect(()=>{

      if(type=='admin'|| type=='distr'){
        if(distid!=''){
          const x="distr";
          fetch(`http://localhost:1337/api/allschools/${x}/${distid}`).then(res=>res.json()).then(data=>setAllSchl(data)).catch(err=>console.error(err));
          //console.log(allschl);
        }
      }
    },[distid])

    async function editStud(){
      const Student={name,email,password,study,school,aggr,gender,dist,distid,schoolid};
      console.log("before axios");
      const response=await axios.put(`${url}/editstud/${type}/${editid}`,Student);
      if(response){
        alert("Updated Succesfully")
        window.location.href = `${url2}/allStudent/${type}/${id}`
      }
      //window.location.href=`//${id}`
    }
  return (
    <div className='page'>
      <div className='login-box1'>
        <h2>Edit Student </h2>
        <form onSubmit={editStud}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" placeholder="Name"></input><br/>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input><br/>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"></input><br/>  
            <input value={study} placeholder='Study' onChange={(e)=>setStudy(e.target.value)} type="Number"></input>
            <input value={aggr} placeholder='Aggregate' onChange={(e)=>setAggr(e.target.value)} type="Number"></input>
            
            <input type="radio" name="gender" value="Male" onChange={(e)=>setGender(e.target.value)}></input>
            <label for="male">Male</label>
            <input type="radio" name="gender" value="Female" onChange={(e)=>setGender(e.target.value)}></input>
            <label for="female">Female</label>
            <br></br>
            <select value={[distid,dist]} onChange={(e) => {const [did,dname]=e.target.value.split(",");setDistId(did);setDist(dname);}}>
          <option>select district</option>
          {alldist.map((d) => (
            <option value={[d._id,d.dist]} key={d._id}>{d.dist}</option>
          ))}
        </select>
        <select value={[schoolid,school]} onChange={(e) => { 
          console.log("hello");
          const [sid,sname]=e.target.value.split(",");
          setSchoolID(sid);
          setSchool(sname); 
          console.log(schoolid,school);
        }} >
           <option>select school</option>
          {allschl.map((d) => (
            <option value={[d._id,d.name]} key={d._id}>{d.name}</option>
          ))}
        </select>
            <input type="submit" value="Submit" />
            </form>
            </div>
    </div>
  )
}

export default EditStudent