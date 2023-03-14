import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import successImg from "../../src/img/success.png";
import { Tab }  from "@mui/material";;

const EmailVerify = () => {
const [validUrl, setValidUrl] = useState(true);
const param = useParams();

useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/user/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        
        console.log(error);
        setValidUrl(false);

      }
    };
    verifyEmailUrl();
  }, [param]);
  
const containerStyle = {
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
height: "100vh",
backgroundColor: "#f2f2f2",
};

const imgStyle = {
width: "100px",
height: "100px",
marginBottom: "20px",
};

const headingStyle = {
fontSize: "24px",
fontWeight: "bold",
marginBottom: "20px",
};

const buttonStyle = {
backgroundColor: "#00b300",
color: "#fff",
padding: "10px 20px",
borderRadius: "5px",
cursor: "pointer",
textDecoration: "none",
border: "none",
outline: "none",
fontSize: "16px",
fontWeight: "bold",
transition: "all 0.3s ease-in-out",
marginTop: "20px",
};

const greenButtonStyle = {
...buttonStyle,
backgroundColor: "#00b300",
};

const redButtonStyle = {
...buttonStyle,
backgroundColor: "#d9534f",
};

return (
<div style={containerStyle}>
{validUrl ? (
<>
<img src={successImg} alt="success_img" style={imgStyle} />
<h1 style={headingStyle}>Email verified successfully</h1>
<Tab key="login" style={greenButtonStyle} to="/login" LinkComponent={Link} label="Login" />

</>
) : (
<h1 style={headingStyle}>404 Not Found</h1>
)}
</div>
);
};

export default EmailVerify;