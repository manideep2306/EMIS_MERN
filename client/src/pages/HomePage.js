import React from 'react'
import { NavLink } from 'react-router-dom'
import './bgcss.css'

const HomePage = () => {
  return (
    <div className='page'>
    <h1>
        EMIS
    </h1>

    <h2>
      Login as
    </h2>
    
    <NavLink className="aaa" to="/login">Admin</NavLink>
    <br>
    </br>
    <br></br>
    <NavLink className="aaa" to="/districtlogin">District Head</NavLink>
    <br></br>
    <br></br>
    <NavLink className="aaa" to="/schoollogin">School Head</NavLink>
    <br></br>
    <br></br>
    <NavLink className="aaa" to="/learninghomepage">Learning Platform</NavLink>
    
    </div>
  )
}

export default HomePage