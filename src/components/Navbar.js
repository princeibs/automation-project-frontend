import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useCookies } from 'react-cookie'
import {useGetUserId} from "../hooks/useGetUserId"
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userDetails, setUserDetails] = useState({})
  const navigate = useNavigate()
  const userId = useGetUserId()

  const role = window.localStorage.getItem("role");

  const getUserDetails = async () => {
    try {
      const res = role==1 ?  await axios.post("http://localhost:3001/staff/details", {id: userId}) : role==2 ? await axios.post("http://localhost:3001/auth/details", {id: userId}): ""
      setUserDetails(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const logout = () => {
    setCookies("access_token", "");
    setUserDetails("")
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("role");
    toast.success("Logout successful")
    navigate("/")
  }

  useEffect(() => {
    if (userId && cookies.access_token) {
      getUserDetails();
    }
  }, [userId, cookies.access_token])

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
      {(cookies.access_token && userId && role == 1) && (<div className='border text-white mx-auto px-4 py-2 rounded-md bg-slate-700'>{userDetails.email} - {String(userDetails.firstName).toUpperCase()}</div>) }
      {(cookies.access_token && userId && role == 2) && (<div className='border text-white mx-auto px-4 py-2 rounded-md bg-slate-700'>{userDetails.matricNo} - {String(userDetails.firstName).toUpperCase()}</div>) }
      
    </div>
  )
}

export default Navbar