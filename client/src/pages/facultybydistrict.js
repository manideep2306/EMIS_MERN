import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const FacultyByDistrict = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/faculty-by-district')
      .then(res => {
        const labels = res.data.map(district => district._id);
        const counts = res.data.map(district => district.count);
        setData({
          labels,
          datasets: [
            {
              label: 'Number of Faculty by District',
              data: counts,
              backgroundColor: 'rgba(255, 99, 132, 0.4)',
              borderColor:'rgba(255, 99, 132, 1)',
              borderWidth:'1'
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
    <div style={{width:"25vw", height:"35vh"}}>
      <h2>Faculty by District</h2>
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

export default FacultyByDistrict;