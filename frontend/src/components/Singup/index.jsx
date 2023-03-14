


import styles from "./styles.module.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });



  const formValidation = () => {
    const localErrors = {
      name: "",
      email: "",
      password: "",
    };

    if (!inputs.name.trim()) {
      localErrors.name = "Name is required";
    }

    if (!inputs.email.trim()) {
      localErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)
    ) {
      localErrors.email = "Invalid email format";
    }

    if (!inputs.password.trim() || inputs.password.length < 6) {
      localErrors.password = "Password is required and must be at least 6 characters";
    }

    setErrors(localErrors);
    // Check if there are any errors
    for (let key in localErrors) {
      if (localErrors[key]) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSignup=()=>{};  

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      setMsg(data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  //---//
  const[msg,setMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      // send http request
      sendRequest().then(() => history("/login"));
    }
  };

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
	  <h1>Create Account</h1>
		
  
              <input
			  type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                variant="outlined"
                fullWidth
                placeholder="Name"
                error={Boolean(errors.name)}
                helperText={errors.name}
				required className={styles.input}
              />
           
              <input
                name="email"
                onChange={handleChange}
                type={"email"}
                value={inputs.email}
                variant="outlined"
                fullWidth
                placeholder="Email"
                error={Boolean(errors.email)}
                helperText={errors.email}
				required
							className={styles.input}
              />
            
           
              <input
                name="password"
                onChange={handleChange}
                type="password"
                value={inputs.password}
                variant="outlined"
                fullWidth
                placeholder="Password"
                error={Boolean(errors.password)}
                helperText={errors.password}
				required
				className={styles.input}
              />
           
           
              <button type="submit" className={styles.green_btn}>
                Signup
              </button>
            
            <Button
              variant="contained"
              type="button"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignup}
              >
               Sign up with Google
            </Button>
            
                    
         
       
      </form>
	 
    </div>
	
			</div></div>
		
	);
};
	

export default Signup;
