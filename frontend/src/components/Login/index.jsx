import {  TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import axios from 'axios';
import {  Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import styles from "./styles.module.css";
import Google from "../../img/google.png";
import GoogleLogin from 'react-google-login';



  
  
const Login = () => {
    
    const [accessToken, setAccessToken] = useState('');
	const [error, setError] = useState("");
    const dispatch = useDispatch();
        const history=useNavigate();
        const [inputs, setinputs] = useState({
            
            email:"",
            password:""
    
    });
        const handleChange=(e)=>{
            setinputs(prev=>({
                ...prev,
                [e.target.name]:e.target.value
            }))
           
    
        };
        const sendRequest=async()=>{
            const res= await axios.post('http://localhost:5000/api/login',{
               
                email:inputs.email,
                password:inputs.password
    
            }).catch(err=>console.log(err));
            const data=await res.data;//yaatik e data mel back
            return data;
        }
        const handleSubmit=(e)=>{
            e.preventDefault();
           // console.log(inputs);
            //send http request
           
            const errors = validateForm(inputs);
            if (Object.keys(errors).length === 0) {
                sendRequest().then(()=>dispatch(authActions.login())).then(()=>history("/user"));
            } else {
              setError(errors);
            }
            
        };
        const google = () => {
            window.open("http://localhost:5000/auth/google", "_self");
            
          };
          
          const validateForm = (inputs) => {
            const errors = {};
            if (!inputs.email) {
              errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
              errors.email = 'Email is invalid';
            }
            if (!inputs.password) {
              errors.password = 'Password is required';
            }
            return errors;
          };
          
           
        
        
    
      return (
       
        <div className={styles.login_container}>
						<div className={styles.login_form_container}>
						<div className={styles.left}>
            
            <form className={styles.form_container} onSubmit={handleSubmit}>
			<h1>Login To Your Account</h1>
				
    
                    {/* <Typography variant="h2">Login</Typography> */}
                    
                   
                    <input name="email" onChange={handleChange} type={'email'} value={inputs.email}variant="outlined" placeholder="Email" className={styles.input}/>
                    {error.email && <div className="styles.error_msg">{error.email}</div>}
                    <input name="password" onChange={handleChange} type={'password'}value={inputs.password}variant="outlined" placeholder="Password" className={styles.input}/>
                    <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link>
            {error.password && <div className="styles.error_msg">{error.password}</div>}
					<button type="submit" className={styles.green_btn}>Sign In</button>
                    <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
                    
                
                
            </form>
        </div>
		<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
                    
				</div>
		</div>
        
		</div>
      )
    }
 

export default Login