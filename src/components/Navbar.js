import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'

const Navbar = ({userDetails, userId, cookies, role, setCookies, setUserDetails}) => {

  const navigate = useNavigate()

  const logout = () => {
    setCookies("access_token", "");
    setUserDetails("")
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("role");
    toast.success("Logout successful")
    navigate("/")
  }

  return (
    <div className='flex flex-row items-center w-full px-[20px] py-[30px] mb-4 bg-primary-100 sm:flex-col sm:items-start sm:p-3'>
      <div id='logo-text' className='text-2xl sm:text-2xl sm:font-semibold sm:mx-auto'>Project Topics Recommender System</div>
      <div className='border-2 border-primary-300 flex flex-row justify-around items-center w-[700px] h-[50px] rounded-[10px] ml-[6rem] no-underline sm:m-0 sm:w-full sm:border-0 sm:flex-wrap sm:h-auto sm:items-start sm:mt-4 sm:gap-1'>  
        <Link className='bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' to="/">Home</Link>
        {(userDetails.role == 2) && <Link className='bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' to="/search">Search</Link> }
        {(userDetails.role == 2) && <Link className='bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' to="/saved">Saved</Link> }
        {(userDetails.role == 1) && <Link className='bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' to="/staff/profile">Profile</Link>}
        {(userDetails.role == 1) && <Link className='bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' to="/staff/add">Add Topic</Link>}
        {/* {(userDetails.role) &&  } */}
        {/* <Link to="/recommended">Recommended</Link> */}
        <div className='block sm:hidden'>|</div>
        {cookies.access_token? (
           <div className='cursor-pointer bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' onClick={logout}>Logout</div>
        ) : (
          <>
            <Link className='bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' to="/login">Log in</Link>
            <Link className='bg-primary-100 sm:bg-primary-0 sm:rounded-md sm:px-6 sm:py-2 drop-shadow-[0] sm:drop-shadow' to="/register">Register</Link>
          </>
        )}
      </div>
      {(cookies.access_token && userId && role == 1) && (<div className='border text-white mx-auto px-4 py-2 sm:mt-4 rounded-md bg-slate-700'>{userDetails?userDetails.firstName?.toString().toUpperCase():""}</div>)}
      {(cookies.access_token && userId && role == 2) && (<div className='border text-white mx-auto px-4 py-2 sm:mt-4 rounded-md bg-slate-700'>{userDetails?userDetails.matricNo?.toString().toUpperCase():""}</div>)}
    </div>
  )
}

export default Navbar