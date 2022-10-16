import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';


const UpdatePass = () => {
    
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState();

    let defaultFormVals = ["password", "confirmPass"];

    const [formValues, setFormValues] = useState(defaultFormVals);

    const getValues = (e) =>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
}

const sendPassReset = (e) => {
    e.preventDefault();

    let payload = {
        password: formValues['password'],
        confirmPass: formValues['confirmPass']
    }

    axios.patch('http://localhost:5000/api/updatepass/' + searchParams.get('id'), payload)
    .then((res)=>{
      console.log(res.data);
  
      if(res.data.success){
        setMessage("Your Password has been reset!");
      } else {
        setMessage("There was a problem resetting your password ");
      }
  
    })
    .catch(function(error){console.log(error)});
}

  return (
    <div>
    <Grid container spacing={5}>
    <Grid item xs={4}></Grid>
    <Grid item xs={4}>
      <p>Reset your password here</p>
      <form onSubmit={sendPassReset}>
        <TextField required name="password" label="New Password" fullWidth margin="dense" onChange={getValues} />
        <TextField required name="confirmPass" label="Confirm Password" fullWidth margin="dense" onChange={getValues} />
        <Button type="submit" style={{marginTop: "8px", height: "55px"}} fullWidth variant="contained">Reset Password</Button>
      </form>
      <p>{message}</p>
      </Grid>
      <Grid item xs={4}></Grid>
      </Grid>
    </div>
  )
}

export default UpdatePass
