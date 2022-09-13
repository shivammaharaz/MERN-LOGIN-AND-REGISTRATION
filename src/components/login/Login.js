import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import {useNavigate} from "react-router";

const Login = (props) => {
const navigate= useNavigate()


  const [user,setUser]=useState([{
    email:"",
    password:""
  }])

  const handleChange=(e)=>{
   
    const {name,value} = e.target
    console.log(name,value)
    setUser({
      ...user,
      [name]:value
    })
    
  }

  const login=()=>{
    axios.post("http://localhost:5000/login", user)
    .then((resp) =>{ 
      alert(resp.data.message);
      props.setLogin(resp.data.user)
      navigate("/")
    });
  }
  return (
    <div className="login">
      <h1>Login</h1>
      {console.log("user>>",user)}
      <input type="email" name="email" value={user.email} id="" placeholder='Enter your email' onChange={handleChange} />
      <input type="password" name="password" value={user.password} id=""  placeholder='Enter your password' onChange={handleChange}/>
      <div className="btn btn-primary button" onClick={login}>Login</div>
      <div>or</div>
      <div className="btn btn-primary button" onClick={()=>navigate("/register")}>Register</div>
    </div>
  )
}

export default Login