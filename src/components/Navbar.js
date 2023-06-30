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
    <div className='flex items-center w-full px-[20px] py-[30px] mb-4 bg-primary-100'>
      <div id='logo-text' className='text-6xl'>Finder</div>
      <div className='border flex justify-around items-center w-[700px] h-[50px] rounded-[10px] ml-[11rem]'>  
        <Link  to="/">Home</Link>
        {(userDetails.role == 2) && <Link to="/search">Search</Link> }
        {(userDetails.role == 2) && <Link to="/saved">Saved</Link> }
        {(userDetails.role == 1) && <Link to="/staff/profile">Profile</Link>}
        {(userDetails.role == 1) && <Link to="/staff/add">Add Topic</Link>}
        {/* {(userDetails.role) &&  } */}
        {/* <Link to="/recommended">Recommended</Link> */}
        {"|"}
        {cookies.access_token? (
           <div className='cursor-pointer' onClick={logout}>Logout</div>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      {(cookies.access_token && userId && role == 1) && (<div className='border text-white mx-auto px-4 py-2 rounded-md bg-slate-700'>{userDetails?userDetails.email:""} - {userDetails?userDetails.firstName?.toString().toUpperCase():""}</div>)}
      {(cookies.access_token && userId && role == 2) && (<div className='border text-white mx-auto px-4 py-2 rounded-md bg-slate-700'>{userDetails?userDetails.matricNo?.toString().toUpperCase():""} - {userDetails?userDetails.firstName?.toString().toUpperCase():""}</div>)}
    </div>
  )
}

export default Navbar