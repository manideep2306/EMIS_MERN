import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const StudentBySchool = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/student-by-school')
      .then(res => {
        const labels = res.data.map(district => district._id);
        const counts = res.data.map(district => district.count);
        setData({
          labels,
          datasets: [
            {
              label: 'Number of Students by School',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor:'rgba(75, 192, 192, 0.6)',
              borderWidth:'1.5'
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
      <h2>Students by School</h2>
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

export default StudentBySchool;