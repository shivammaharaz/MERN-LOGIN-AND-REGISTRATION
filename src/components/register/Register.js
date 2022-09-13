import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {

  const navigate=useNavigate();
  const [user, setUser] = useState([
    {
      name: "",
      email: "",
      password: "",
      reEnterPassword: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };
  // register
  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios
        .post("http://localhost:5000/register", user)
        .then((resp) => {
          alert(resp.data.message)
          navigate("/login")
        });
    } else {
      alert("invalid inputs");
    }
  };

  return (
    <div className="register">
      {console.log("user>>", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        id=""
        placeholder="Your Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        id=""
        placeholder="Your Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        id=""
        placeholder="Your Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        id=""
        placeholder="Re-enter Password"
        onChange={handleChange}
      />

      <div className="btn btn-primary" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="btn btn-primary" onClick={()=>navigate("/login")}>Login</div>
    </div>
  );
};

export default Register;
