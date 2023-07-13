import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const PieChart = () => {
  const { id, editid, type } = useParams();
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
          options:options,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{width:"15vw", height:"36vh"}}>
      <h2>Students by Gender</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Pie data={data} height={10} width={10}/>
      )}
    </div>
  );
};

export default PieChart;