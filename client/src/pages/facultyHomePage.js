import React from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './style.css'
import './bgcss.css'
import './coursecss.css'
import Dashboard from './Dashboard'

const FacultyHomePage = () => {
  const {id,type}=useParams()
  
  return (
    
    <div className='page'>
      <Dashboard/>
      <center>
      
      </center>
    </div>
        
  )
}

export default FacultyHomePage