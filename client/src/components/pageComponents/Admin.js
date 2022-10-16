import React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';


function Admin() {

let defaultFormVals = ["name", "last", "email", "username", "password"];

const [formValues, setFormValues] = useState(defaultFormVals);

const getValues = (e) =>{
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
}

const addUser = (e) => {
    e.preventDefault();

    let payload = {
        first: formValues['name'],
        last: formValues['last'],
        email: formValues['email'],
        username: formValues['username'],
        password: formValues['password']
  }

  console.log(payload);
  

  Axios.post('http://localhost:5000/api/newUser', payload)
  .then((res)=> {
    if(res){
      console.log("User Added"); 
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
        <h1>Add A New User</h1>
        <form onSubmit={addUser}>
            <TextField required name="name" label="First Name" fullWidth margin="dense" onChange={getValues} />
            <TextField required name="last" label="Last Name" fullWidth margin="dense" onChange={getValues}/>
            <TextField required name="email" label="Email" fullWidth margin="dense" onChange={getValues}/>
            <TextField required name="username" label="Username" fullWidth margin="dense" onChange={getValues} />
            <TextField required name="password" label="Password" fullWidth margin="dense" onChange={getValues} />
            <Button type="submit" style={{marginTop: "8px", height: "55px"}} fullWidth variant="contained">Add New User</Button>
        </form>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
    </div>
  );
}

export default Admin;
