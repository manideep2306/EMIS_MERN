import React from 'react'
import { NavLink } from 'react-router-dom'
import './coursecss.css'

const CoursePage = () => {
  return (
    <div className='page'>
        <p>Login as</p>
        <NavLink className="aaa1" to="/studentlogin">Student</NavLink>
        <NavLink className="aaa2" to="/facultyloginforcourse">Faculty</NavLink>
    </div>
  )
}

export default CoursePage