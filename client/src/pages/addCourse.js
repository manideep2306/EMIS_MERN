import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const AddCourse= () => {
  const {id,type}=useParams()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    async function courseadd(event){
        event.preventDefault();
        const response=await fetch(`http://localhost:1337/api/addcourse/${type}/${id}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            title,
            author
          }),
        })
        const data = await response.json()
        if(data.status==='ok'){
          alert("Course added succesfully")
          window.location.href='/facultyloginforcourse'
        }
      }
  return (
    <div>
        <h1>Add Course</h1>
        <form onSubmit={courseadd}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" placeholder="Enter title of course"></input><br/>
          <input value={author}
            onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Enter Display Name"></input><br/>
            <br></br>
            <input type="submit" value="Register" />
            </form>
    </div>
  )
}

export default AddCourse