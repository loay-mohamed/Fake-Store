import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux//Slices/UserSlice'
import { useNavigate } from 'react-router-dom';
import { Link, Links, NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);



  const token = useSelector((state) => state.user.token)
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="bg-black p-2 w-full">
        <h3 className="text-white text-2xl font-bold text-center tracking-normal leading-none">
          Welcome All
        </h3>
      </div>

      {token ? (
        <div className="flex justify-around items-center bg-slate-200 h-14">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG6OPW_MdDNhsZ6cuNF77rNajMuU76eTKZ2g&s"
              alt="store"
              className="h-14 w-full"
            />
          </div>
          <div className="flex flex-row items-center">
            <button
              className="text-base font-medium text-center tracking-normal leading-none mr-4"
            >
              <Link to='/'>
                Home
              </Link>

            </button>
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <Link to='/wishlist'>

                <p className="text-base font-medium text-center tracking-normal leading-none mr-4 cursor-pointer">
                  Wish List
                </p>
              </Link>
            </div>
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <Link to='/cart'>

                <p className="text-base font-medium text-center tracking-normal leading-none mr-4 cursor-pointer">
                  Shopping Bag
                </p>
              </Link>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-black hover:bg-gray-800  text-white px-4 py-2 rounded-lg"
              >
                Menu
              </button>
              {isOpen && (
                <div className="absolute mt-2 w-64 bg-black shadow-md rounded-lg overflow-hidden z-50">
                  <button
                    onClick={handleLogout}
                    className="text-base text-white font-medium text-center tracking-normal leading-none mr-4 p-5"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        <div className="relative flex justify-center p-3">
          <button
            onClick={() => setIsOpenProfile(!isOpenProfile)}
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full flex items-center gap-2"
          >
            <FaUser size={20} />
            Profile
          </button>
          {isOpenProfile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-14 w-48 bg-slate-300 shadow-md rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="p-4 hover:bg-gray-200 cursor-pointer text-center">
                  
                  <Link to='/login' className='flex gap-3'>
                  <FaUser size={20} />
                    Login
                  </Link>

                </li>
                <li className="p-4 hover:bg-gray-200 cursor-pointer text-center">
                  <Link to='/signup' className='flex gap-3'>
                  <FaUser size={20} />
                    Sign Up
                  </Link>

                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}
