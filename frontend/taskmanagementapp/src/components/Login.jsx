import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [perr, setPerr] = useState('');
  const emailRef = useRef(null);
  const navigate=useNavigate('')
  const passwordRef = useRef(null);
useEffect(()=>{
if(localStorage.getItem("taskstoken")){
  navigate("/")
}
else{
    navigate("/login")
}
},[])



  const validateForm = () => {
    setErr('');
    setPerr('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!uname) {
      setErr('Email is required');
      return false;
    } else if (!emailPattern.test(uname)) {
      setErr('Enter a valid email');
      return false;
    }
    if (!pwd) {
      setPerr('Password is required');
      return false;
    }
    return true;
  };

  async function handleLogin() {
    if (!validateForm()) return;

    try {
      const user = await axios.post('https://hvataskmanagementappbackendproject.onrender.com/user/login', { email: uname, password: pwd });
      console.log(user);
      
      localStorage.setItem('taskstoken', user.data.token);
      const roleResponse = await axios.get('https://hvataskmanagementappbackendproject.onrender.com/user/role', {
        headers: { Authorization: localStorage.getItem('taskstoken') },
      });
      navigate(roleResponse.data.data==='admin'?'/admin':'/');
    } catch (error) {
     
      if (error.response && error.response.data.message) {
        if (error.response.data.message.includes('Invalid email')) setErr('Invalid email');
        else if (error.response.data.message.includes('Invalid password')) setPerr('Invalid password');
      } else {
        setErr('An unexpected error occurred. Please try again.');
      }
    } 
  }

  return  (
    <div className='login'>
      <div>
        <input
          onChange={(e) => setUname(e.target.value)}
          placeholder='Email'
          className={`un ${err ? 'input-error-custom' : ''}`}
          type="text"
          value={uname}
          ref={emailRef}
        />
        <span className='form-error-custom'>{err}</span>
      </div>
      <div>
        <input
          onChange={(e) => setPwd(e.target.value)}
          placeholder='Password'
          className={`up ${perr ? 'input-error-custom' : ''}`}
          type="password"
          value={pwd}
          ref={passwordRef}
        />
        <span className='form-error-custom'>{perr}</span>
      </div>
      <button className='lbn' onClick={handleLogin}>Login</button>
      <div className='login-links'>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;