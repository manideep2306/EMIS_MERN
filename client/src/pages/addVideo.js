import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { styled,FormControl,Input,Button, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './loginpage.css'
const FormData=require('form-data');
const AddVideo = () => {
  const {id,type}=useParams()
  const [name,setName]=useState('')
  const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl]=useState('');
    const url='http://localhost:1337/api';
    
    useEffect(()=>{
      async function get(){
        try{
          
          var res;
          if(type=="admin")
          res=await axios.get(`${url}/admin/${type}/${id}`);
      
          if(type=="faculty")
          res=await axios.get(`${url}/faculty/${type}/${id}`);
          setName(res.data[0].name);
        }
        catch(error){
          console.log("error while getting student details in edit",error);
        }
      }
      get();
      },[]);
    async function addVideo(event){
        event.preventDefault();
        const formData=new FormData();
        formData.append('title',title);
        formData.append('description',description);
        formData.append('imageUrl',imageUrl);
        formData.append('videoUrl',videoUrl);
        formData.append('name',name)
        try{
            console.log("before");
       const response= await axios.post(`http://localhost:1337/api/video/${type}/${id}`,formData);
       console.log("after");
        if(response.data["status"]==='ok')
      alert("Video uploaded");
      window.location.href=`http://localhost:3000/allvideo/${type}/${id}`;
        }
        catch(err)
        {
            console.log("error in calling video api",err);
        }
      
    

    }
  return (
    
    <div className="page">
      <div className='login-box'>
      <h1>Add Video</h1>
       
       <form onSubmit={addVideo} >
        <label>Title</label>
       <input value={title} onChange={(e) => setTitle(e.target.value)} type="text"/><br></br>
       <label>Description</label>
       <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" /><br></br>
       <label>Add Image</label> <input  onChange={(e) => setImageUrl(e.target.files[0])} type="file" name="imageUrl"/><br></br>
       <label>Add Video</label><input onChange={(e) => setVideoUrl(e.target.files[0])} type="file" name="videoUrl"/><br></br>
        <Button type="submit" variant="contained" color="primary">Upload</Button> 
       </form>
       
      </div>
        
      </div>
  );
}

export default AddVideo;
