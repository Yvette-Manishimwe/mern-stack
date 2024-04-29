import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Search() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    
    const getData= async() => {
    return await axios.get('http://localhost:5000/all')
            .then(res => {
                console.log(res.data);
                setFilterData(res.data);
                // setData(res.data);
            })
            .catch(err => console.error(err)); // Log error if fetch fails

    };

    useEffect(()=>{
        getData()
    },[])

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        let res = [];
        
        if (Array.isArray(filterData)) {
            res = filterData.filter(f => f.name.toLowerCase().includes(value));
            
        }
        console.log(res)
        setData(res);
        
        if (value === "") {
            setData(filterData); // Restore original data if filter value is empty
        }
    }
    

    return(
        <div>
            <input type='text' placeholder='search here...' className='bg-gray-200' onChange={handleFilter} />
            <div>
                {Array.isArray(data) && data.map((d, i) => {
                    return (
                        <div key={i}>
                            {d.name}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Search;
