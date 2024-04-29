import React, { Component, useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const { id } = useParams();
    const navigate= useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:5000/read/'+id)
            .then(res => {
                console.log(res.data)
                setValues({...values, name:res.data[0].name, email: res.data[0].email});
            })
            .catch(err => console.log(err));
    }, [id]); 

    const [values, setValues] = useState({
        name:'',
        email: ''
    });

    const handleInput =(event) =>{
        event.preventDefault()
        axios.put('http://localhost:5000/update/'+id, values)
        .then(res=> {
            console.log(res)
            navigate('/home')

        }).catch(err=> console.log(err))
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-blue-500'>
          <div className='bg-white p-6 rounded-lg shadow-md w-80' >
            <h2 className='text-2xl font-bold mb-6'>Sign In</h2>
            <form onSubmit={handleInput} >
              <div className='mb-4'>
                <label htmlFor='name' className="block text-sm  mb-2"><strong>name</strong></label>
                <input
                  type='name'
                  placeholder='Enter name'
                  id='name'
                  name='name' // Add name attribute for form submission
                  value={values.name}
                  onChange={e=> setValues({...values, name:e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                />
                
              </div>
              <div className='mb-4'>
                <label htmlFor='email' className="block text-sm  mb-2"><strong>email</strong></label>
                <input
                  type='email'
                  placeholder='Enter email'
                  id='email'
                  name='email' // Add name attribute for form submission
                  value={values.email}
                  onChange={e=> setValues({...values, email:e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                />
 
              </div>
              <button  type='submit' className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300" >Update</button>
            </form>
          </div>
        </div>
      );
}
export default Update;