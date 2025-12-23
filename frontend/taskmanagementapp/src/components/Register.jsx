import React, { useEffect, useState } from 'react';
import '../styles/register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({ username:'',email:'',password:'',confirmpassword:'',role:'normal'});
  const [errors, setErrors] = useState({username:'',email:'',password:'',confirmpassword:''});


  const validateForm = () => {
    setErrors({ username: '', email: '', password: '', confirmpassword: '' });

    if (!uname) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required' }));
      return false;
    }
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      return false;
    }
    if (password !== confirmpassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmpassword: 'Passwords do not match' }));
      return false;
    }
    return true;
  };

  async function handleBackend() {
    try {
      const response = await axios.post('https://hvataskmanagementappbackendproject.onrender.com/user/register', formData);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response.data.message.includes('User already exists')) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'User already exists, please login' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, general: 'An error occurred, please try again.' }));
        }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ username: uname, email, password, confirmpassword });
    if (validateForm()) {
      handleBackend();
    }
  };

  return (
    <div className="container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          className={errors.username ? 'input-error-custom' : ''}
          required
        />
        <span className="form-error-custom">{errors.username}</span>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'input-error-custom' : ''}
          required
        />
        <span className="form-error-custom">{errors.email}</span>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={errors.confirmpassword ? 'input-error-custom' : ''}
          required
        />
        <span className="form-error-custom">{errors.confirmpassword}</span>

        <button type="submit" className="regbn">Register</button>
        <p className="login-prompt">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;