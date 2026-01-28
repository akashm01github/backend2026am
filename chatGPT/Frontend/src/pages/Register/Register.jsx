import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`;

    console.log({
      fullName,
      email: formData.email,
      password: formData.password
    });



    try {
      const response = await axios.post('http://localhost:3000/api/auth/register',
        { fullName:{firstName:formData.firstName, lastName:formData.lastName}, email: formData.email, password: formData.password },
        { withCredentials: true })

        console.log("Registered Successfully",response.data)

        navigate('/login')
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  };


  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit}>


          {/* First name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">Register</button>
        </form>

        <div className="login-link">
          <p>Already have an account? <span className='loginBtn' onClick={() => navigate('/login')}>Login</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;