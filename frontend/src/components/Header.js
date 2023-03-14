
import React, { useState } from "react";
import{ AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
axios.defaults.withCredentials=true
const Header =()=> {
  const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  const sendLogoutReq=async()=>{
    const res=await axios.post("http://localhost:5000/api/logout",null,{
      withCredentials:true
    });
    if(res.status==200){
      return res
    }
    return new Error("Unable To Logout. Please try again")
  } 
  const handleLogout=()=>{
    sendLogoutReq().then(()=>dispatch(authActions.logout())
    );
  }   
  const[value,setValue]=useState();
  return (
    <div>
     <AppBar position="sticky">
        <Toolbar>
            <Typography variant="h3">Khadamni

            </Typography>
            <Box sx={{marginLeft:'auto'}}>
                <Tabs indicatorColor="secondary"
                 onChange={(e,val)=>setValue(val)} value={value} textColor="inherit">
                    {!isLoggedIn && <><Tab to="/login" LinkComponent={Link} label="Login"/>
                    <Tab to="/signup" LinkComponent={Link} label="Signup"/></> 
                           }
                    {isLoggedIn && (
                    <Tab onClick={handleLogout} to="/" LinkComponent={Link} label="Logout "/>
                    )}{" "}
                </Tabs>
            </Box>

        </Toolbar>
     </AppBar>
    </div>
  );
}

export default Header;
