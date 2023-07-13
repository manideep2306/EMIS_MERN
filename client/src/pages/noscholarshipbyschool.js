import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function NoScholarshipBySchool() {
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/noscholarship-by-school')
      .then((response) => {
        setDistrictData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    labels: districtData.map((district) => district._id),
    datasets: [
      {
        label: "Number of Students",
        data: districtData.map((district) => district.count),
        backgroundColor: 'rgb(0, 238,0,0.4)',
              borderColor:'rgb(0, 238,0,1)',
              borderWidth:'1.3'
      },
    ],
  };

  return (
    <div style={{width:"25vw", height:"25vh"}}>
      <h2>No Scholarship by School</h2>
      <Bar data={data} />
    </div>
  );
}

export default NoScholarshipBySchool;
