import React, {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../config'
import { toast } from 'react-toastify'

const StaffLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const resp = await axios.post(`${baseUrl}/staff/login`, {
          email: String(email).toLowerCase(), password
        });
        if (resp.status == 200) {
            setCookies("access_token", resp.data.token);
            window.localStorage.setItem("userId", resp.data.userId);
            window.localStorage.setItem("role", resp.data.role);
            navigate("/");
            toast.success("Login successful!");
        } else {
            toast.error("Failed to log in");
        }
      } catch (e) {
        toast.error(e.response.data.message);
        console.error(e)
      }
    }

    return (
        <section class="">
        <div class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p class="text-xl font-bold text-gray-900 md:text-2xl">
                        Log in (Staff)
                    </p>
                    <p className='text-sm'>Log in to start finding topics</p>
                    <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label for="matricNo" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" name="matricNo" id="matricNo" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="myemail@localhost.com" onChange={e => setEmail(e.target.value)} required/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" onChange={e => setPassword(e.target.value)} required/>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                        <p class="text-sm font-light text-gray-500">
                            Dont have an account? <a href="#" class="font-medium text-primary-600 hover:underline"><Link to="/staff/register">Register here</Link></a>
                        </p>
                        <p class="text-sm font-light text-black">
                           Not a staff? <a href="#" class="font-medium text-primary-600 hover:underline"><Link to="/login">Login as student</Link></a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}

export default StaffLogin