import React from 'react'
import { useParams } from 'react-router-dom'
import { Table, TableCell, TableHead, TableBody, TableRow, styled, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const StyledTable = styled(Table)`
 width: 90%;
 margin:50px auto 0 auto;
`

const THead = styled(TableRow)`
background-color:yellow;
&>th{
  color:#fff;
  font-size:20px;
  color:black;
}
`
const TBody = styled(TableRow)`
&>td{
  font-size:20px;
  background-color:white;
}
`

const url = 'http://localhost:1337/api';
const AllDistrict = () => {
  const {id,type}=useParams()
  const [District, setDistrict] = useState([])
  useEffect(() => {
    async function getDist() {
      try {
        let response = await axios.get(`http://localhost:1337/api/alldistricts/${type}/${id}`);
        console.log(response);
        setDistrict(response.data)
      }
      catch (error) {
        console.log("Error while fetching districts", error)
      }
    }
    getDist();
  }, []);

  const deleteDist = async (idd) => {
    try {
      await axios.delete(`${url}/deletedist/${idd}`);
      alert("Deleted Successfully");
      window.location.href = `/alldistrict/${type}/${id}`
    }
    catch (err) {
      console.log("error while calling delete user api", err);
    }
  }

  return (
    <div>
      <Dashboard/>
    <StyledTable>
      <TableHead>
        <THead>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>District</TableCell>
          <TableCell></TableCell>
        </THead>
      </TableHead>
      <TableBody>
        {
          District.map(distr => (
            <TBody>
              <TableCell>{distr.name}</TableCell>
              <TableCell>{distr.email}</TableCell>
              <TableCell>{distr.dist}</TableCell>
              <TableCell>
                <Button variant="contained" style={{ marginRight: 10 }} component={Link} to={`/editdistrict/${type}/${id}/${distr._id}`}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => deleteDist(distr._id)}>Delete</Button>
              </TableCell>
            </TBody>
          ))
        }
      </TableBody>
    </StyledTable>
    </div>
  )
}

export default AllDistrict