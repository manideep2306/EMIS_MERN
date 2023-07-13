import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './styling/dashboardcss.css'
import Chart from 'chart.js';
import BarGraph from './bargraph';
import PieChart from './pieChart';
import FacultyByDistrict from './facultybydistrict';
import FacultyBySchool from './facultybyschool';
import StudentBySchool from './studentbyschool';
import StudentsByDistrictChart from './studentsbydistrictchart';


const Dashboard = () => {


  const { id, type } = useParams();
  const render = type === "admin"
  const drender = type === 'distr' || type === 'admin'
  const srender = type === 'distr' || type === 'admin' || type === 'school'
  const distrender = type === "distr"
  const arender = type === "admin" || type === 'faculty' || type === 'student'
  const facrender = type === "admin" || type === 'faculty'
  const studrender = type === "student"
  const chat = type === "student" || type === "faculty"
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };


  useEffect(() => {
    axios.get(`http://localhost:1337/api/count/gender/${type}/${id}`)
      .then((res) => {
        const male = res.data.maleCount;
        const female = res.data.femaleCount;
        setMaleCount(male);
        setFemaleCount(female);
        setData({
          labels: ["Male", "Female"],
          datasets: [
            {
              label: "Gender",
              data: [male, female],
              backgroundColor: ["#36A2EB", "#FF6384"],
              hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
          options: options,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className='page'>
      <nav className='navbar'>

        <ul>
          <li><NavLink activeClassName="active" to={`/dashboard/${type}/${id}`}>&emsp;Home&emsp;</NavLink></li>
          {render && (<li><NavLink activeClassName="active" to={`/dashboardpageresults/${type}/${id}`}>&emsp;&emsp;Dashboard&emsp;&emsp;</NavLink></li>)}

          {render && (
            <li className='dropdown'>
              <NavLink activeClassName="active">&emsp;&emsp;District&emsp;&emsp;</NavLink>
              <ul className='dropdown-menu'>
                <li><NavLink activeClassName="active" to={`/districtregister/${type}/${id}`} >Add District Head</NavLink></li>
                <li><NavLink activeClassName="active" to={`/alldistrict/${type}/${id}`} >All District Heads</NavLink></li>
              </ul>
            </li>
          )}



          {drender && (
            <li className='dropdown'>
              <NavLink activeClassName="active">&emsp;&emsp;School&emsp;&emsp;</NavLink>
              <ul className='dropdown-menu'>
                <li><NavLink activeClassName="active" to={`/schoolregister/${type}/${id}`} >Add School Head</NavLink></li>
                <li><NavLink activeClassName="active" to={`/allschool/${type}/${id}`} >All School Heads</NavLink></li>
              </ul>
            </li>
          )}

          {srender && (
            <li className='dropdown'>
              <NavLink activeClassName="active">&emsp;&emsp;Faculty&emsp;&emsp;</NavLink>
              <ul className='dropdown-menu'>
                <li><NavLink activeClassName="active" to={`/facultyregister/${type}/${id}`} >Add Faculty</NavLink></li>
                <li><NavLink activeClassName="active" to={`/allfaculty/${type}/${id}`} >All Faculty</NavLink></li>
              </ul>
            </li>

          )}

          {srender && (
            <li className='dropdown'>
              <NavLink activeClassName="active">&emsp;&emsp;Student&emsp;&emsp;</NavLink>
              <ul className='dropdown-menu'>
                <li><NavLink activeClassName="active" to={`/studentregister/${type}/${id}`}>Add Student</NavLink></li>
                <li><NavLink activeClassName="active" to={`/allStudent/${type}/${id}`}>All Student</NavLink></li>
              </ul>
            </li>
          )}

          {chat && (
            <li className='dropdown'>

              <NavLink activeClassName="active" to={`/chat/${type}/${id}`} target="_blank">&emsp;&emsp;Chat&emsp;&emsp;</NavLink>

            </li>
          )}

          {facrender && (
            <li className='dropdown'>

              <NavLink activeClassName="active" to={`/addvideo/${type}/${id}`}>&emsp;&emsp;Add Videos&emsp;&emsp;</NavLink>
            </li>
          )}

          {arender && (
            <li className='dropdown'>

              <NavLink activeClassName="active" to={`/allvideo/${type}/${id}`}>&emsp;&emsp;All Videos&emsp;&emsp;</NavLink>
            </li>
          )}

          {studrender && (
            <li className='dropdown'>

              <NavLink activeClassName="active" to={'#'}
                onClick={async () => {
                  const response = await fetch(`http://localhost:1337/api/scholarship/${id}`);
                  const result = await response.json();
                  const aggregate = result.aggr;
                  if (aggregate > 80) {
                    alert('Congratulations! You are eligible for the scholarship.')
                    window.location.href = `/scholarshipdetails/${type}/${id}`
                  } else {
                    alert('Sorry, you are not eligible for the scholarship.')
                  }
                }}>&emsp;&emsp;Check for scholarship&emsp;&emsp;</NavLink>
            </li>
          )}
          <NavLink className="logout" to='/homepage' >Logout</NavLink>
        </ul>
      </nav>
      <br></br>


    </div>


  )
}

export default Dashboard