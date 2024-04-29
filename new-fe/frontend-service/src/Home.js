import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import Search from './Search';

function Home() {
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({})
  const [limit, setLimit] = useState(3)
  const [page, setPage] = useState(1)


  const fetchData = async() => {
   return await axios.get("http://localhost:5000/pages", {
    params: {
      page: page,
      limit: limit
    }
   })
      .then(res => {
        setPaginationData(res.data.pagination)
        setData(res.data.data)
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData()
  }, [limit, page])

  const handleDelete = async(id) => {
   await axios.delete(`http://localhost:5000/delete/${id}`)
      .then(res => {
        console.log('Item deleted successfully');
        // Remove the deleted item from the data state
        setData(data?.data.filter(user => user.id !== id));
      })
      .catch(err => console.log(err));
  };

  const handlePageClick=(e)=>{
    setPage(e.selected + 1)
    fetchData()
  }



  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center flex-col">
      <div className="bg-white p-8 rounded-lg">
        <h2 className='text-2xl font-bold mb-4'>Student list</h2>
      
        <div className='relative p-4 w-full mb-10'>
          <search>
          <Search />
          </search>
          <Link to='/signup' className='bg-green-900 text-white px-4 py-2 rounded justify-end absolute right-4'>Create +</Link>
        </div>
        <table className="w-full mb-7">
          <thead>
            <tr>
              <th className="border-b border-gray-200">Id</th>
              <th className="border-b border-gray-200">Name</th>
              <th className="border-b border-gray-200">Email</th>
              <th className="border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((user) => (
              <tr key={user.id}>
                <td className="border-b border-gray-200 py-2 px-4">{user.id}</td>
                <td className="border-b border-gray-200 py-2 px-4">{user.name}</td>
                <td className="border-b border-gray-200 py-2 px-4">{user.email}</td>
                <td className="border-b border-gray-200 py-2">
                  <Link to={`/read/${user.id}`} className="bg-green-400 text-white px-4 py-2 mr-2 rounded">Read</Link>
                  <Link to={`/edit/${user.id}`} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </td>
              </tr>
            )): <div>No users found</div> }
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={paginationData.totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName='pagination justify-content-center flex flex-row justify-center  '
          pageClassName='page-item'
          pageLinkClassName='page-link bg-gray-200 px-4 py-2 mr-2 '
          previousClassName='page-item'
          previousLinkClassName='page-link bg-blue-500 mr-3 p-3 text-white rounded'
          nextClassName='page-item'
          nextLinkClassName='page-link bg-blue-500 mr-3 p-3 text-white rounded'
          activeClassName='active' 
        />
      
      <div className='mt-8 '>
      <h2>Write number of records u want to display</h2>
      <input type='text' value={limit} onChange={(e) => {
        setLimit(e.target.value)
        if(limit !== "") {
          fetchData()
        }
      }} className='justify-center text-center bg-gray-200'/>
      </div>
      </div>
    </div>
  );
}

export default Home;
