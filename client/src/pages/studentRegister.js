import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import './loginpage.css'

const StudentRegister = () => {
  const { id, type } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [study, setStudy] = useState('')
  const [school, setSchool] = useState('')
  const [aggr, setAggr] = useState('')
  const [gender, setGender] = useState('false')
  const [dist, setDist] = useState('')
  const [schoolid, setSchoolID] = useState('')
  const [distid, setDistId] = useState('')
  const [alldist, setAllDist] = useState([]);
  const [allschl, setAllSchl] = useState([]);
  var response1;
  useEffect(() => {
    async function getDists() {
      try {
        if (type == 'admin' || type == 'distr') {
          let response = await axios.get(`http://localhost:1337/api/alldistricts/${type}/${id}`);

          setAllDist(response.data)
        }
        else {
          let x = 'admin'
          response1 = await axios.get(`http://localhost:1337/api/school/${type}/${id}`)
          console.log(response1.data)
          const newid = response1.data[0].distid;
          let response2 = await axios.get(`http://localhost:1337/api/district/${x}/${newid}`)
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
  useEffect(() => {
    if (type == 'admin' || type == 'distr') {
      if (distid != '') {
        const x = "distr";
        fetch(`http://localhost:1337/api/allschools/${x}/${distid}`).then(res => res.json()).then(data => setAllSchl(data)).catch(err => console.error(err));
        //console.log(allschl);
      }
    }
  }, [distid])
  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:1337/api/studentregister/${type}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        study,
        school,
        aggr,
        gender,
        dist,
        schoolid,
        distid
      }),
    })
    const data = await response.json()
    if (data.status === 'ok') {

      axios.put('https://api.chatengine.io/users/',{username:name,secret:name,custom_json:"{type:student}"},{headers:{"Private-Key":"22d78935-e382-4c60-8996-cb0e4c2e9c1f"}}).then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Student Registered Succesfully");
      
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
        <h2>Student Register</h2>
        <form onSubmit={registerUser}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" placeholder="Name"></input><br />
          <input value={email}
            onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input><br />
          <input value={password}
            onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input><br />
          <input value={study} placeholder='Class of Study' onChange={(e) => setStudy(e.target.value)} type="Number"></input>
          <br></br>
          <input value={aggr} placeholder='Aggregate' onChange={(e) => setAggr(e.target.value)} type="number"></input>

          <br></br>
          <label for="male">Male</label>
          <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)}></input>
          <label for="female">Female</label>
          <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)}></input>
          <br>
          </br>
          <select value={[distid, dist]} onChange={(e) => { const [did, dname] = e.target.value.split(","); setDistId(did); setDist(dname); }}>
            <option>select district</option>
            {alldist.map((d) => (
              <option value={[d._id, d.dist]} key={d._id}>{d.dist}</option>
            ))}
          </select>
          <br></br>


          <select value={[schoolid, school]} onChange={(e) => {
            console.log("hello");
            const [sid, sname] = e.target.value.split(",");
            setSchoolID(sid);
            setSchool(sname);
            console.log(schoolid, school);
          }} >
            <option>select school</option>
            {allschl.map((d) => (
              <option value={[d._id, d.name]} key={d._id}>{d.name}</option>
            ))}
          </select>
          <br></br>
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  )
}

export default StudentRegister