import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import {
  AdminLogin,
  AdminStaffs,
  AdminStudents,
  AdminSupervisorDetails,
} from "./pages/Admin";
import {
  AddTopic,
  StaffLogin,
  StaffProfile,
  StaffRegister,
  StaffTopics,
  StaffStudents,
  StaffUpdateProfile,
} from "./pages/Staff";
import {
  Login,
  Register,
  SearchTopic,
  StaffDetails,
  SupervisorTopic,
} from "./pages/Student";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useGetUserId } from "./hooks/useGetUserId";
import { baseUrl } from "./helpers/config";
import Loader from "./components/Loader";

// Main parent component
export default function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userDetails, setUserDetails] = useState({});
  const userId = useGetUserId();
  const [loading, setLoading] = useState(false);

  // Get user role from local storage. 
  const role = window.localStorage.getItem("role");

  // Get details of currently logged in user
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res =
        role == 1
          ? await axios.get(`${baseUrl}/staff/details`, {
              headers: { authorization: cookies.access_token, id: userId },
            })
          : role == 2
          ? await axios.get(`${baseUrl}/auth/details`, {
              headers: { authorization: cookies.access_token, id: userId },
            })
          : role == 0
          ? await axios.get(`${baseUrl}/admin/details`, {
              headers: { authorization: cookies.access_token, id: userId },
            })
          : "";
      setUserDetails(res.data);
    } catch (e) {
      if (e?.response?.status == 404) {
        toast.error("Authentication failed. Please login again");
      } else {
        console.log(e);
        toast.error(e?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && cookies.access_token) {
      getUserDetails();
    }
  }, [userId, cookies.access_token]);

  return (
    <div className="app min-h-[100vh] m-auto flex flex-col justify-start items-center">
      {!loading ? (
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
            <Route path="/" element={<Home />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/supervisors" element={<AdminStaffs />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route
              path="/admin/supervisor/:id"
              element={<AdminSupervisorDetails />}
            />

            {/* Student */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchTopic />} />
            <Route path="/supervisor-topic" element={<SupervisorTopic />} />
            <Route path="/staff-details/:id" element={<StaffDetails />} />

            {/* Staff */}
            <Route path="/staff/register" element={<StaffRegister />} />
            <Route path="/staff/login" element={<StaffLogin />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
            <Route path="/staff/add" element={<AddTopic />} />
            <Route path="/staff/topics" element={<StaffTopics />} />
            <Route path="/staff/students" element={<StaffStudents />} />
            <Route
              path="/staff/update-profile"
              element={<StaffUpdateProfile />}
            />
          </Routes>
        </Router>
      ) : (
        <Loader />
      )}
      <ToastContainer position="bottom-center" />
      {/* <Footer/> */}
    </div>
  );
}
