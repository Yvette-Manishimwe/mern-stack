import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import SideBar from './Sidebar';

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    return await axios
      .get('http://localhost:5000/pages', {
        params: {
          page: page,
          limit: limit,
        },
      })
      .then((res) => {
        setPaginationData(res.data.pagination);
        setData(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        console.log('Item deleted successfully');
        setData(data.filter((user) => user.id !== id));
        setFilteredData(filteredData.filter((user) => user.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
    fetchData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredData(data.filter((user) => user.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="grid grid-cols-4  bg-white min-h-screen  flex items-start justify-center flex-col px-4 py-4 md:px-8">
       
        <SideBar handleLogout={handleLogout} />
        
    
      <div className="bg-white  p-4 md:p-8 rounded-lg w-full max-w-4xl shadow-md col-span-3">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Student list</h2>

        <div className="relative p-4 w-full mb-10 flex flex-col md:flex-row items-center justify-between">
          <Search onSearch={handleSearch} />
          <Link to="/signup" className="bg-green-900 text-white px-4 py-2 rounded mt-4 md:mt-0">
            Create +
          </Link>
        </div>

        <table className="w-full mb-7 table-auto">
          <thead>
            <tr>
              <th className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2">Id</th>
              <th className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2">Name</th>
              <th className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2">Email</th>
              <th className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2">{user.id}</td>
                  <td className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2">{user.name}</td>
                  <td className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2">{user.email}</td>
                  <td className="border-b border-gray-200 px-2 py-1 md:px-4 md:py-2 flex flex-col md:flex-row">
                    <Link to={`/read/${user.id}`} className="bg-green-400 text-white px-2 py-1 md:px-4 md:py-2 mr-2 mb-2 md:mb-0 rounded">
                      Read
                    </Link>
                    <Link to={`/edit/${user.id}`} className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 mr-2 mb-2 md:mb-0 rounded">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
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
          containerClassName="pagination justify-content-center flex flex-row justify-center mb-4"
          pageClassName="page-item"
          pageLinkClassName="page-link bg-gray-200 px-4 py-2 mr-2 rounded"
          previousClassName="page-item"
          previousLinkClassName="page-link bg-blue-500 mr-3 p-3 text-white rounded"
          nextClassName="page-item"
          nextLinkClassName="page-link bg-blue-500 mr-3 p-3 text-white rounded"
          activeClassName="active"
        />

        <div className="mt-8 text-center">
          <h2 className="text-lg">Write number of records you want to display</h2>
          <input
            type="text"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              if (limit !== '') {
                fetchData();
              }
            }}
            className="justify-center text-center bg-gray-200 p-2 rounded mt-2"
          />
        </div>
      </div>
      {/* <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button> */}
    </div>
  );
}

export default Home;
