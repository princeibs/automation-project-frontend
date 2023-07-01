import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home, SearchTopic, SavedTopics, AddTopic } from './pages';
import {Register, Login, Admin, StaffLogin, StaffRegister, StaffProfile} from "./pages/auth"
import Navbar from "./components/Navbar"
import Footer from './components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { useGetUserId } from './hooks/useGetUserId';
import axios from 'axios';
import { baseUrl } from './config';
import Loader from './components/Loader';


export default function App() {
const [cookies, setCookies] = useCookies(["access_token"]);
const [userDetails, setUserDetails] = useState({})
const userId = useGetUserId();
const [loading, setLoading] = useState(false)

const role = window.localStorage.getItem("role");

const getUserDetails = async () => {
  try {
    setLoading(true)
    const res = role==1 ?  await axios.post(`${baseUrl}/staff/details`, {id: userId}) : role==2 ? await axios.post(`${baseUrl}/auth/details`, {id: userId}): ""
    setUserDetails(res.data)
  } catch (e) {
    console.log(e);
    toast.error(e?.message)
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  if (userId && cookies.access_token) {
    getUserDetails();
  }
}, [userId, cookies.access_token])

  return (
    <div className="app min-h-[100vh] m-auto flex flex-col justify-start items-center">
      {!loading? (
        <Router>
          <Navbar 
            userDetails={userDetails}
            getUserDetails={getUserDetails}
            userId={userId}
            cookies={cookies}
            role={role}
            setCookies={setCookies}
            setUserDetails={setUserDetails}
          />
          <Routes>
            {/* Shared  */}
            <Route path='/' element={<Home/>}/>

            {/* Student */}
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/search' element={<SearchTopic/>}/>
            <Route path='/saved' element={<SavedTopics/>}/>

            {/* Staff */}
            <Route path='/staff/register' element={<StaffRegister/>}/>
            <Route path='/staff/login' element={<StaffLogin/>}/>
            <Route path='/staff/profile' element={<StaffProfile/>}/>
            <Route path='/staff/add' element={<AddTopic/>}/>
          </Routes>
        </Router>
      ) : (
        <Loader/>
      )}
      <ToastContainer position='bottom-center' />
      <Footer/>
    </div>
  )
}
