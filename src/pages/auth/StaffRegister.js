import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

// List of possible area of specialization
const aos = [
    {name: "Web development", value: "web"},
    {name: "Mobile App Development", value: "mobile"},
    {name: "Artificial Intelligence", value: "ai"},
    {name: "Machine Learning", value: "ml"},
    {name: "Data Science", value: "ds"},
    {name: "Cyber Security", value: "cs"},
    {name: "Blockchain Engineering", value: "blockchain"}
]

const defaultImage = "https://ih1.redbubble.net/image.1046392278.3346/pp,840x830-pad,1000x1000,f8f8f8.jpg"

const StaffRegister = () => {
    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [otherNames, setOtherNames] = useState("");
    const [imageUrl, setImageUrl] = useState(defaultImage)
    const [qualifications, setQualifications] = useState("")
    const [specialization, setSpecialization] = useState([])
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    const handleSpecializationChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSpecialization(prev => [...prev, value]);
        } else {
            setSpecialization(prev =>
            prev.filter(specialization => specialization !== value)
            );
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Passwords must match!");
            return
        }
        try {
            const res = await axios.post(`${baseUrl}/staff/register`, {
                email: String(email).toLowerCase(), title, firstName, lastName, otherNames, image: imageUrl, password, qualifications, specialization
            });
            toast.success("Registration completed. Proceed to log in")
            navigate("/staff/login")
        } catch (e) {
            if (e.response.status == 400) {
                toast.error("User already exists")
            } else {
                console.error(e)
            }
            
        }
    }
  return (
    <section class="h-auto">
      <div class="flex flex-col items-center px-6 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Register your details (Staff)
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                          <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="myemail@localhost.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                      </div>
                      <div>
                          <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
                          <input type="text" name="firstName" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Prof." value={title} onChange={e => setTitle(e.target.value)}/>
                      </div>
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
                          <label for="qualifications" class="block mb-2 text-sm font-medium text-gray-900">Qualifications</label>
                          <input type="text" name="qualifications" id="qualifications" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Bsc. Msc. " value={qualifications} onChange={e => setQualifications(e.target.value)} required/>
                      </div>
                      <div>
                      <label for="specialization" class="block mb-2 text-sm font-medium text-gray-900">Areas of specialization</label>
                        <ul class="flex flex-col items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                            {aos.map(({name, value}) => (
                                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div class="flex items-center pl-3">
                                        <input id="" type="checkbox" name={name} value={value} onChange={handleSpecializationChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                        <label for={name} class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{name}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
                          Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline"><Link to="/staff/login">Log in here</Link></a>
                      </p>
                      <p class="text-sm font-light text-black">
                          Not a staff? <a href="#" class="font-medium text-primary-600 hover:underline"><Link to="/register">Register as student</Link></a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default StaffRegister