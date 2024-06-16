import React from 'react';
import { AiOutlineUser, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function SideBar({ handleLogout }) {
  return (
    <div className="text-white h-full w-200 flex flex-col items-center justify-center py-4">
      <h1 className="text-xl font-bold pt-10 pb-9 text-black">Sidebar</h1>
      <ul className="flex flex-col items-center w-full ">
        <li className="flex mb-4 w-full ml-10">
          <AiOutlineLogin className="mr-2 text-black" />
          <Link to="/signup" className="text-blue-300 hover:text-blue-200">
            Sign Up
          </Link>
        </li>
        <li className="flex items-center ml-10 mb-4 w-full">
          <AiOutlineLogin className="mr-2 text-black" />
          <Link to="/login" className="text-blue-300 hover:text-blue-200">
            Log In
          </Link>
        </li>
        <li className="flex items-center ml-10 mb-4 w-full">
          <AiOutlineUser className="mr-2 text-black" />
          <Link to="/users" className="text-blue-300 hover:text-blue-200">
            Users
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="bg-gray-800 items-start text-white px-4 py-4 rounded mt-auto">
        <AiOutlineLogout className="mr-2" />
        Logout
      </button>
    </div>
  );
}

export default SideBar;
