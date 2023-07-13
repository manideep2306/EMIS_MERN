import React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';

const url = 'http://localhost:1337/api';
const AllVideos = () => {
  const { id, type } = useParams();
  const [videos, setVideos] = useState([]);
  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    async function getVid() {
      try {
        let response = await axios.get(`${url}/uploadedVideos/${type}/${id}`);
        setVideos(response.data);
        setOptions(response.data);   
        console.log(response);
      }
      catch (error) {
        console.log("error while getting all videos", error.message);
      }
    }
    getVid();
  }, []);
  async function getByDate(propsdate) {
    try {
      console.log("start of getdate fn");
      var res = await axios.get(`${url}/byDateVideos/${propsdate}`);
      console.log("after axios in getdatefn");
      setVideos(res.data);

    }
    catch (error) {
      console.log("error while getting all videos filter by date", error.message);
    }
  }
  return (<>
    <Dashboard />
    <div>

      <b>All videos</b><br></br></div>
    <br></br>
    <div style={{ marginTop: '20px', display: 'flex' }}>

      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => {
          const { title } = option;
          return title[0].toUpperCase() + title.substr(1);
        }}
        style={{ width:'250px', marginRight: '20px',marginLeft:'10px',  borderRadius: '5px',backgroundColor:'white' }}
        onChange={function (event, selection) {
          setSelection(selection);
        }}
        renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, style: { width:'250px',color:'black', marginLeft: '10px' } }} label="Search Videos" style={{ color: 'black' }} InputLabelProps={{ style: { color: 'black', left: "10px", top: '-5px' } }} />} />
      <input style= {{ fontFamily:'Times New Roman, sans-serif',border: '2px solid #008CBA',backgroundColor: '#008CBA',fontSize: '12px',padding: '12px 28px',borderRadius: '4px',cursor:'pointer',boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'}} type="button" value="Search" onClick={() => { if (selection == null) { setVideos(options); } else { setVideos([selection]); } }} />
    </div>
    <br></br>
    <div style={{ margin: '10px' }}>Filter by Date : <input type="date" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); getByDate(e.target.value); }} /></div>
    <div style={{
      display: 'grid'
      , gridTemplateColumns: 'repeat(3,1fr)',
      gridTemplateRows: '1fr 1fr 1fr',
      height: '400px',
      gridGap: '10px',
    }}>
      {videos.map((vid) => {
        return (<div style={{
          border: '1px solid black',
          boxShadow: '0 0 5px black',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'orange',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Link to={`http://localhost:3000/displayvideo/${type}/${id}/${vid._id}`} > <img width="100%" height="200px" src={`http://localhost:1337/${vid.imageUrl}`} /></Link>
          <div>{vid.title}</div>
          <div>{vid.description}</div>

        </div>);
      })}
    </div></>)
}
export default AllVideos;