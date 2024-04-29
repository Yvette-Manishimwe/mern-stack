import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignUpValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate=useNavigate()
  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  useEffect(() => {
    // Check for errors after every state update
    setErrors(Validation(values));
  }, [values]); // Trigger on changes in the 'values' state

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if there are no errors
    if (!errors.name && !errors.email && !errors.password) {
      axios.post("http://localhost:5000/signup", values)
        .then(navigate('/'))
        .catch(err => console.log(err));
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500 ">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6">Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
            <input 
              type="text" 
              placeholder="Enter name" 
              id="name" 
              name="name"
              value={values.name}
              onChange={handleInput} 
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500" 
            />
            {errors.name && <span className="text-red-500"> {errors.name}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              id="email" 
              name="email"
              value={values.email}
              onChange={handleInput} 
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500" 
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              id="password" 
              name="password"
              value={values.password}
              onChange={handleInput} 
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500" 
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">Sign up</button>
          <p className="mt-4">You agree to terms and conditions</p>
          <Link to="/" className="block text-center mt-2 text-blue-500 hover:underline">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
