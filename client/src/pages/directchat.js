import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import axios from 'axios';
const DirectChatPage = () => {
	const {id,type}=useParams();
	const [name,setName]=useState("");
	const [username, setUsername] = useState('')
  useEffect(()=>{
	   async function get()
	   { 
		 var res;
		   if(type=="student")
			res=await axios.get(`http://localhost:1337/api/student/${type}/${id}`);
		   if(type=="faculty")
			 res=await axios.get(`http://localhost:1337/api/faculty/${type}/${id}`);
			
		   setName(res.data[0].name);
	   }
	   get();
	},[id,type]);

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					search
				</button>
			</div>
		)
	}
   console.log(name);

	return (
		<>
		{ name && (
		<ChatEngine
			height='100vh'
			userName={name}
			userSecret={name}
			projectID='a2ec912b-39ca-47c9-9adc-e6ed8461bd5b'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
		)}
		</>
	);
		
}

export default DirectChatPage;