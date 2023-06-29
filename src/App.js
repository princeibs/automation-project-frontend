import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home, SearchTopic, SavedTopics, AddTopic } from './pages';
import {Register, Login, Admin, StaffLogin, StaffRegister, StaffProfile} from "./pages/auth"
import Navbar from "./components/Navbar"
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="app min-h-[100vh] m-auto flex flex-col justify-start items-center">
      <Router>
        <Navbar/>
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
        <Footer/>
      </Router>
      <ToastContainer position='bottom-center' />
    </div>
  )
}
