import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import './loginpage.css'

const FacultyRegister = () => {
  const { id, type } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subject, setSubject] = useState('')
  const [school, setSchool] = useState('')
  const [alldist,setAllDist]=useState([]);
  const [allschl,setAllSchl]=useState([]);
  const [dist,setDist]=useState('')
  const [distid,setDistId]=useState('')
  const [schoolid,setSchoolID]=useState('')
  var response1;
  
  useEffect(() => {
    async function getDists() {
      try {
        if(type=='admin' || type=='distr'){
          let response = await axios.get(`http://localhost:1337/api/alldistricts/${type}/${id}`);
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
  }, []);
  
  useEffect(()=>{
    if(type=='admin'|| type=='distr'){
      if(distid!=''){
        const x="distr";
        fetch(`http://localhost:1337/api/allschools/${x}/${distid}`).then(res=>res.json()).then(data=>setAllSchl(data)).catch(err=>console.error(err));
        //console.log(allschl);
      }
      
    }
    /*else{
      console.log('hiii')
      setAllSchl(response1.data)
    }*/
    },[distid])
    
  
  async function registerUser(event) {
    
    event.preventDefault();
    // getSchl(schoolid).then(val=>setSchool(val))
    // getDist(distid).then(val=>setDist(val))
    const response = await fetch(`http://localhost:1337/api/facultyregister/${type}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        subject,
        school,
        schoolid,
        dist,
        distid
      }),
    })
    const data = await response.json()
    if (data.status === 'ok') {

      axios.put('https://api.chatengine.io/users/',{username:name,secret:name,custom_json:"{type:faculty}"},{headers:{"Private-Key":"22d78935-e382-4c60-8996-cb0e4c2e9c1f"}}).then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Faculty Registered Succesfully");
      
        window.location.href = `/dashboard/${type}/${id}`;
    })
    .catch(function (error) {
        console.log(error.response.data);
    });
    }
    else {
      alert("Not registered !!! Kindly check details once again")
    }
  }
  return (
    <div className='page'>
      <div className='login-box1'>
      <h2>Faculty Register</h2>
      
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"></input><br />
          <label>Email</label>
        <input value={email}
          onChange={(e) => setEmail(e.target.value)} type="email"></input><br />
          <label>Password</label>
        <input value={password}
          onChange={(e) => setPassword(e.target.value)} type="password" ></input><br />
        <label>Subject</label>
        <input value={subject}  onChange={(e) => setSubject(e.target.value)} type="text"></input>
        <br></br>
        <select value={[distid,dist]} onChange={(e) => {const [did,dname]=e.target.value.split(",");setDistId(did);setDist(dname);}}>
          <option>------select district------</option>
          {alldist.map((d) => (
            <option value={[d._id,d.dist]} key={d._id}>{d.dist}</option>
          ))}
        </select>
        <br></br>
        
        
        <select value={[schoolid,school]} onChange={(e) => { 
          console.log("hello");
          const [sid,sname]=e.target.value.split(",");
          setSchoolID(sid);
          setSchool(sname); 
          console.log(schoolid,school);
        }} >
           <option>-----select school-----</option>
          {allschl.map((d) => (
            <option value={[d._id,d.name]} key={d._id}>{d.name}</option>
          ))}
        </select>
        
        <br></br>
        <input type="submit" value="Register" />
      </form>
      </div>
    </div>
  )
}

export default FacultyRegister