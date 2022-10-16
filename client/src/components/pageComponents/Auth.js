import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";


const Auth = () => {

  const [searchParams] = useSearchParams();
  const [welcome, setWelcome] = useState();
  const [message, setMessage] = useState();

  useEffect(()=>{
    axios.patch('http://localhost:5000/api/validate/' + searchParams.get('id'))
    .then((res)=>{
      console.log(res.data);

      if(res.data.success){
        setWelcome("Welcome " + res.data.user + "!");
        setMessage("Your account has been verified, you may now login");
      } else {
        setWelcome("Account Not Verified");
        setMessage("There was a problem verifying your account, please contact system admin");
      }

    })
    .catch(function(error){console.log(error)});
  },[])

  return (
    <div>
      <h1>{welcome}</h1>
      <p>{message}</p>
    </div>
  )
}

export default Auth
