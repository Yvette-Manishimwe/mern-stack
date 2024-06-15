import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    // Check for errors after every state update
    setErrors(Validation(values));
  }, [values]); // Trigger on changes in the 'values' state

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if there are no errors in email and password fields
    if (!errors.email && !errors.password) {
      axios.post("http://localhost:5000/login", values)
        .then(res => {
          if (res.data.Login) {
            localStorage.setItem('token', res.data.token);
            navigate('/home');
          } else {
            alert('Invalid credentials. Please try again.');
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-500'>
      <div className='bg-white p-6 rounded-lg shadow-md w-80' >
        <h2 className='text-2xl font-bold mb-6'>Sign In</h2>
        <form action='' onSubmit={handleSubmit} >
          <div className='mb-4'>
            <label htmlFor='email' className="block text-sm  mb-2"><strong>Email</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              id='email'
              name='email' // Add name attribute for form submission
              value={values.email}
              onChange={handleInput}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            />
            {errors.email && <span className='text-red-500'>{errors.email}</span>}
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className="block text-sm  mb-2"><strong>Password</strong></label>
            <input
              type='password'
              placeholder='Enter Password'
              id='password'
              name='password' // Add name attribute for form submission
              value={values.password}
              onChange={handleInput}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            />
            {errors.password && <span className='text-red-500'>{errors.password}</span>}
          </div>
          <button type='submit' className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300" ><strong>Login</strong></button>
          <p>You agree to the terms and conditions</p>
          <Link to='/signup' className="block text-center mt-2 text-blue-500 hover:underline">Create account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
