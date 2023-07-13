import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Dashboard from './Dashboard';
import './styling/commentstyle.css'
import { NavLink } from 'react-router-dom';
const Comment = (props) => {
  const { name, text } = props;
  return (<>
    <div>{name} : {text}</div>
  </>);

}
const DisplayVideo = () => {
  const [author, setAuthor] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [name, setName] = useState('')
  const { type, id, videoid } = useParams();
  const url = 'http://localhost:1337/api';
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    async function fetchComments() {
      const res = await axios.get(`${url}/getcomments/${type}/${id}/${videoid}`);
      setComments(res.data);
    }

    fetchComments();
  }, [comments]);
  useEffect(() => {
    async function get() {
      try {
        let response = await axios.get(`${url}/getvideo/${type}/${videoid}`);
        setAuthor(response.data[0].facname);
        setTitle(response.data[0].title)
        setDescription(response.data[0].description)
        setVideoUrl(response.data[0].videoUrl);
        var res;
        if (type == "admin")
          res = await axios.get(`${url}/admin/${type}/${id}`);
        if (type == "student")
          res = await axios.get(`${url}/student/${type}/${id}`);
        if (type == "faculty")
          res = await axios.get(`${url}/faculty/${type}/${id}`);
        setName(res.data[0].name);
      }
      catch (error) {
        console.log("error while getting student details in edit", error);
      }
    }
    get();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${url}/addcomment/${type}/${id}/${videoid}`, {
        text, name
      });

    } catch (err) {
      console.error(err);
    }

    setText('');
  };

  return (

    <div className="video-details-container">
      <div className="video-container">
        <video
          className='videostyle'
          src={`http://localhost:1337/${videoUrl}`}
          width="1200"
          height="500"
          controls="controls"
        />
      </div>
      <div className="details-nav-container">
  <div className="details-container">
    <div className='details-row'>
      <label className='details-label'>Video Uploaded by:</label>
      <span className='details-content'>{author}</span>
    </div>
    <div className='details-row'>
      <label className='details-label'>Title of the Video:</label>
      <span className='details-content'>{title}</span>
    </div>
    <div className='details-row'>
      <label className='details-label'>Description of the Video:</label>
      <span className='details-content'>{description}</span>
    </div>
    <NavLink className='chat' to={`/chat/${type}/${id}`} target="_blank">Chat</NavLink>
  </div>
</div>

      <br></br>
      <h2 style={{ color: 'white' }}>Comments</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); }}
          placeholder="Add a comment"
          className="comment-input"
        />

        <button type="submit" className="comment-button">Submit</button>

      </form>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-container">
            <Comment name={comment.name} text={comment.text} />
          </div>
        ))}
      </div>
    </div>

  );
};
export default DisplayVideo