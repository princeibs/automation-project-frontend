import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';


const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [otherNames, setOtherNames] = useState("");
    const [matricNo, setMatricNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Passwords must match");
            return
        }
        try {
            const res = await axios.post(`${baseUrl}/auth/register`, {
            matricNo: String(matricNo).toLowerCase(), firstName, lastName, otherNames, password
            });
            toast.success("Registration completed. Proceed to log in")
            navigate("/login")
        } catch (e) {
            if (e.response.status == 400) {
                toast.error("User already exists")
            } else {
                console.error(e)
            }
        }
    }
  return (
    <section class="">
      <div class="flex flex-col items-center px-6 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Register your details (Student)
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                          <input type="text" name="firstName" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ibrahim" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                      </div>
                      <div>
                          <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                          <input type="text" name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Suleiman" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                      </div>
                      <div>
                          <label for="otherName" class="block mb-2 text-sm font-medium text-gray-900 ">Other Name(s)</label>
                          <input type="text" name="otherName" id="otherName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Prince" value={otherNames} onChange={e => setOtherNames(e.target.value)}/>
                      </div>
                      <div>
                          <label for="matricNo" class="block mb-2 text-sm font-medium text-gray-900">Matric Number</label>
                          <input type="text" name="matricNo" id="matricNo" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="KASU/18/CSC/0000" value={matricNo} onChange={e => setMatricNo(e.target.value)} required/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={password} onChange={e => setPassword(e.target.value)} required/>
                      </div>
                      <div>
                          <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                          <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                      </div>
                      <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                      <p class="text-sm font-light text-gray-500">
                          Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline"><Link to="/login">Log in here</Link></a>
                      </p>
                      <p class="text-sm font-light text-black">
                          Not a student? <a href="#" class="font-medium text-primary-600 hover:underline"><Link to="/staff/register">Register as staff</Link></a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default Register