import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const StudentsByDistrictChart = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/students-by-district')
      .then(res => {
        const labels = res.data.map(district => district._id);
        const counts = res.data.map(district => district.count);
        setData({
          labels,
          datasets: [
            {
              label: 'Number of Students by District',
              data: counts,
              backgroundColor: 'rgb(0, 238,0,0.4)',
              borderColor:'rgb(0, 238,0,1)',
              borderWidth:'1.3'
            }
          ]
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{width:"25vw", height:"25vh"}}>
      <h2>Students by District</h2>
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
                    precision: 0 // Set the precision of the y-axis tick labels to 0
                  }
                }
              ]
            }
          }}
        />
      )}
    </div>
  );
};

export default StudentsByDistrictChart;