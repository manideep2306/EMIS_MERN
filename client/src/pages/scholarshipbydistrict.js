import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function ScholarshipByDistrict() {
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/scholarship-by-district')
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
        backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{width:"25vw", height:"25vh"}}>
      <h2>Scholarship by District</h2>
      <Bar data={data} />
    </div>
  );
}

export default ScholarshipByDistrict;
