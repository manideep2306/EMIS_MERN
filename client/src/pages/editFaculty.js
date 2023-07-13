import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './loginpage.css'

const EditFaculty = () => {
  const { id, editid, type } = useParams();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subject, setSubject] = useState('')
  const [school, setSchool] = useState('')
  const [alldist, setAllDist] = useState([]);
  const [allschl, setAllSchl] = useState([]);
  const [dist, setDist] = useState('')
  const [distid, setDistId] = useState('')
  const [schoolid, setSchoolID] = useState('')
  var response1;
  const navigat = useNavigate();
  const url = 'http://localhost:1337/api';
  const url2 = 'http://localhost:3000'
  useEffect(() => {
    async function get() {
      try {
        let response = await axios.get(`${url}/faculty/${type}/${editid}`);
        setName(response.data[0].name);
        setEmail(response.data[0].email);
        setPassword(response.data[0].password);
        setSubject(response.data[0].subject);
        setSchool(response.data[0].school);
        setDist(response.data[0].dist)
        setDistId(response.data[0].distid)
        setSchoolID(response.data[0].schoolid)
      }
      catch (error) {
        console.log("error while getting student details in edit", error);
      }
    }
    get();
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
  async function editFac() {
    const Faculty = { name, email, password, subject, school, dist, schoolid, distid };
    console.log("before axios");
    const response = await axios.put(`${url}/editfac/${type}/${editid}`, Faculty);
    if (response) {
      alert("Updated Successfully");
      window.location.href = `${url2}/allfaculty/${type}/${id}`
    }
    //window.location.href=`/alldistrict/${id}`
  }

  return (
    <div className='page'>
      <div className='login-box1'>
        <h2>Edit Faculty </h2>
        <form onSubmit={editFac}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"></input>
          <label>Email</label>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)} type="email"></input><br />
          <label>Password</label>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)} type="password"></input><br />
          <label>Subject</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text"></input>
          <br></br>
          <select value={[distid, dist]} onChange={(e) => { const [did, dname] = e.target.value.split(","); setDistId(did); setDist(dname); }}>
            <option>-----select district-----</option>
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
            <option>-----select school-----</option>
            {allschl.map((d) => (
              <option value={[d._id, d.name]} key={d._id}>{d.name}</option>
            ))}
          </select>

          <br></br>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>

  )
}

export default EditFaculty