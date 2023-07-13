import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const BarGraph = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:1337/api/districts/schools/")
      .then((res) => {
        const districtCounts = res.data;
        setData({
          labels: districtCounts.map((district) => district._id),
          datasets: [
            {
              label: "Number of Schools",
              data: districtCounts.map((district) => district.count),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{width:"25vw", height:"38vh"}}>
      <h2>Schools by District</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Bar
          data={data}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    precision:0
                  },
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

export default BarGraph;