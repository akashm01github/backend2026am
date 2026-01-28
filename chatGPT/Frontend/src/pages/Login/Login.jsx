import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");


  const [password, setPassword] = useState("");


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();




    try {
      const response = await axios.post("http://localhost:3000/api/auth/login",
        { email, password }, { withCredentials: true })


        
      console.log("Login success:", response.data);


      navigate('/')
    } catch (error) {
      console.log(error.response?.data || error.message)
    }


  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              placeholder="Enter your password"
              required
            />
          </div>



          <button type="submit" className="btn-primary">Login</button>
        </form>

        <div className="register-link">
          <p>Don't have an account? <span className='loginBtn' onClick={() => navigate('/register')}>Register</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;