"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import format from 'date-fns/format';
import { IconButton } from '@mui/material';
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Button } from '@mui/material';

const UserIndex = () => {
  const [users, setUser] = useState([]);

  const formatDate = (date: string): string | null => {
    const newDate = new Date(date);

    if (!isNaN(newDate.getTime())) {
      return format(newDate, 'dd/MM/yyyy');
    }

    return null;
  }

  const userMapping = (users: any) => {
    return users.map((user: any) => (
      <TableRow
        key={user.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">{user.name}</TableCell>
        <TableCell component="th" scope="row" align="center">{formatDate(user.date)}</TableCell>
        <TableCell component="th" scope="row" align="center">{user.age}</TableCell>
        <TableCell component="th" scope="row" align="center">{user.school}</TableCell>
        <TableCell component="th" scope="row" align="center">
          <IconButton aria-label="edit">
            <MdModeEditOutline />
          </IconButton>
          <IconButton aria-label="delete">
            <FaTrash />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  }
  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        setUser(response.data.data)
      })
  }, [])

  return (
    <div className="container" style={{paddingTop: '10px'}}>
      <div className="row" style={{paddingBottom: '10px'}}>
        <div className="d-md-flex">
          <Button variant="contained" href='/users/create'>
            <FaPlus />
            Create User
          </Button>
        </div>
      </div>
      <Table component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple-table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">School</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.length !== 0 && userMapping(users)}
          </TableBody>
        </Table>
      </Table>
    </div>
  )
}

export default UserIndex;
