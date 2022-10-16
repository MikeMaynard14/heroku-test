import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Admin from './components/pageComponents/Admin';
import Auth from './components/pageComponents/Auth';
import Login from './components/pageComponents/Login';
import PassReset from './components/pageComponents/PassReset';
import UpdatePass from './components/pageComponents/UpdatePass';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/passwordreset" element={<PassReset/>} />
      <Route path="/updatepassword" element={<UpdatePass/>} />
    </Routes>
  );
}

export default App;
