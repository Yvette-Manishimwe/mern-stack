import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    
    useEffect(() => {
        axios.get('http://localhost:5000/read/'+id)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => console.log(err));
    }, [id]); // Make sure to include id in the dependency array

    if (!user || Object.keys(user).length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div className=' flex justify-center items-center bg-blue-500 min-h-screen'>
            <div className='bg-white w-80 p-6 rounded shadow-2xl'>
                <h2 className='font-semibold underline'>User Detail</h2>
               <div className='mb-3'>
                <h2>{user[0].name}</h2>
                <h2>{user[0].email}</h2>
                <h2>{user[0].password}</h2>
                </div>
                <div className='flex justify-center'>
                <Link to="/home" className='bg-green-900 px-4 py-2 mr-3 rounded text-white  '>back</Link>
                <Link to={`/edit/${user[0].id}`} className='bg-blue-600 px-4 py-2 rounded text-white  '>edit</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;
