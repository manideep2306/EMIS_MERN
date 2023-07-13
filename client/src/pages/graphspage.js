import React from 'react'
import { Bar } from 'react-chartjs-2';
import PieChart from './pieChart';
import BarGraph from './bargraph';
import FacultyByDistrict from './facultybydistrict';
import FacultyBySchool from './facultybyschool';
import StudentsByDistrictChart from './studentsbydistrictchart';
import StudentBySchool from './studentbyschool';
import Dashboard from './Dashboard';
import TotalScholarship from './totalscholarship';
import { NavLink } from 'react-router-dom';
import './styling/viewmore.css'
import { useParams } from 'react-router-dom';


const GraphsPage = () => {
  const { id, type } = useParams()
  return (
    <div>
      <Dashboard />
      <div className='charts'>
        <div className='chart-item'>
          <PieChart />
        </div>
        <div className='chart-item'>
          <BarGraph />
        </div>
        <div className='chart-item'>
          <FacultyByDistrict />
        </div>

        <div className='chart-item'>
          <FacultyBySchool />
        </div>
        <div className='chart-item'>
          <StudentsByDistrictChart />
        </div>
        <div className='chart-item'>
          <StudentBySchool />
        </div>


      </div>
      <br></br>
      <center><NavLink className='activex' to={`/moregraphs/${type}/${id}`}>View More</NavLink></center>
    </div>

  )
}

export default GraphsPage