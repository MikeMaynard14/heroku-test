import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid';


const PassReset = () => {

    let defaultFormVals = ["email"];

    const [formValues, setFormValues] = useState(defaultFormVals);

    const getValues = (e) =>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
}

const sendPassReset = (e) => {
    e.preventDefault();

    let payload = {
        email: formValues['email'],
    }

    axios.post('http://localhost:5000/api/resetpass', payload)
    .then((res)=> {
      if(res){
        console.log(res); 
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}

  return (
    <div>

      <Grid container spacing={5}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
      <p>Reset your password here</p>
      <form onSubmit={sendPassReset}>
        <TextField required name="email" label="Your Account Email" fullWidth margin="dense" onChange={getValues} />
        <Button type="submit" style={{marginTop: "8px", height: "55px"}} fullWidth variant="contained">Send Reset Email</Button>
      </form>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>

    </div>
  )
}

export default PassReset
