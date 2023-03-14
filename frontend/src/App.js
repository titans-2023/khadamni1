
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import EmailVerify from './components/EmailVerify';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header';
import Login from './components/Login';

import PasswordReset from './components/PasswordReset';
import Signup from './components/Singup';



import Welcome from './components/Welcome';
function App() {
  
  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:5000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // })

  
  return (
    <React.Fragment>
    
     <header>
      <Header/>
     </header>
     <main>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {isLoggedIn && <Route path="/user" element={<Welcome/>}/> }
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route path="/user/:id/verify/:token" element={<EmailVerify/>} />
       
          
      </Routes>
     </main>
     </React.Fragment>
  );
}

export default App;
