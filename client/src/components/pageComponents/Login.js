import React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import {Link} from 'react-router-dom';

function Login() {

let defaultFormVals = ["username", "password"];

const [formValues, setFormValues] = useState(defaultFormVals);

const getValues = (e) =>{
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
}

const loginUser = (e) => {
    e.preventDefault();

    let payload = {
        username: formValues['username'],
        password: formValues['password']
  }

  console.log(payload);
  
  Axios.post('http://localhost:5000/api/loginUser', payload)
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
    <div className="App">
      <Grid container spacing={5}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <h1>Login User</h1>
        <form onSubmit={loginUser}>
            <TextField required name="username" label="Username" fullWidth margin="dense" onChange={getValues} />
            <TextField required name="password" label="Password" fullWidth margin="dense" onChange={getValues}/>
            <Button type="submit" style={{marginTop: "8px", height: "55px"}} fullWidth variant="contained">Login User</Button>
        </form>

        <Link to="../passwordreset">Forgot Password</Link>

      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
    </div>
  );
}

export default Login;
