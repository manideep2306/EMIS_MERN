import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function NoScholarshipByDistrict() {
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/noscholarship-by-district')
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
        backgroundColor: 'rgba(255, 159, 64, 0.4)',
              borderColor:'rgba(255, 159, 64, 1)',
              borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{width:"25vw", height:"38vh"}}>
      <h2>No Scholarship by District</h2>
      <Bar data={data} />
    </div>
  );
}

export default NoScholarshipByDistrict;
