"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { redirect } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RenderDatePicker from '@/app/components/RenderDatePicker';

interface FormValues {
  name: string,
  date: Date | null,
  age: number | null,
  school: string
}

const UserCreate: React.FC<{}> = () => {
  const initialValues: FormValues = {
    name: '',
    date: null,
    age: null,
    school: ''
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      redirect('/users')
    }
  })

  return (
    <div className="container">
      <Typography variant='h4' align='center'>
        Create User Form
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({values, actions});
          axios.post('http://localhost:3000/api/users', values)
            .then(response => {
              if(response.status === 200) {
                setSuccess(true);
              } else {
                console.log(response);
              }
            })
        }}
      >
        <Form className='p-10'>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" placeholder="Name" className="form-control"></Field>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="date">Date</label>
              <Field
                name="Date"
                component={RenderDatePicker}
                className="form-control"
              ></Field>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default UserCreate;
