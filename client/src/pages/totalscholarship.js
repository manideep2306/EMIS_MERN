import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";


function TotalScholarship() {
  const [studentsData, setStudentsData] = useState({studentsAbove80: 0, studentsBelow80: 0});

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/totalscholarship')
      .then((response) => {
        setStudentsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    labels: ["Above 80", "Below 80"],
    datasets: [
      {
        label: "Number of students",
        data: [studentsData.studentsAbove80, studentsData.studentsBelow80],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div style={{width:"15vw", height:"30vh"}}>
      <h2>Scholarship Graph</h2>
      <Pie data={data} />
    </div>
  );
}

export default TotalScholarship;