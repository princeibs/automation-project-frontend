import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import {useGetUserId} from "../hooks/useGetUserId"
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../config'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddTopic = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [levelOfExpertise, setLevelOfExpertise] = useState("")
    const [tools, setTools] = useState("");
    const [loading, setLoading] = useState(false)

    const [cookies, _] = useCookies(["access_token"]);
    const userId = useGetUserId();
    const navigate = useNavigate();

    const clear = () => {
        setTitle("");
        setDescription("");
        setLevelOfExpertise("");
        setTools("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (cookies.access_token && userId) {
                const processedTools = tools.split(",").map(tool => String(tool).toLowerCase()).toString();
                const res = await axios.post(`${baseUrl}/staff/add`, {userId, title, description, levelOfExpertise, tools: processedTools});
                clear();
                window.location.assign("/staff/profile");
                toast.success("Topic created successfully");
                //navigate("staff/profile", {replate: true})
            } else {
                toast.warning("Please login before adding topic");
                window.location.assign("/staff/login");
                //navigate("/staff/login");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
      
    }
  return (
    <div className='w-[50rem] mt-8'>
        <form className='' onSubmit={handleSubmit}>
        <div class="mb-6"> 
            <label for="title" class="mb-2 font-semibold text-gray-900">Title</label>
            <input type="text" id="title" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Enter title for the new topic" onChange={e => setTitle(e.target.value)} required/>
        </div>
        <div class="mb-6">
            <label for="message" class="mb-2 font-semibold text-gray-900">Description</label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter description for the new topic" onChange={e => setDescription(e.target.value)} required/>
        </div>
        <div class="flex flex-col items-start mb-3">
            <label for="" class="mb-2 font-semibold text-gray-900">Level of Expertise</label>
            <select id="" onChange={e => setLevelOfExpertise(e.target.value)} class="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required>
                <option>Level of expertise required to build project</option>
                <option value="novice">Novice</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
            </select>
        </div>
        <div class="mb-6"> 
            <label for="title" class="mb-2 font-semibold text-gray-900">Tools</label>
            <input type="text" id="title" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Comma saperated list of programming languages/frameworks project can be built with" onChange={e => setTools(e.target.value)} required/>
        </div>
        <button type="submit" disabled={loading} class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-primary-300">
            {loading ? (<svg aria-hidden="true" role="status" class="inline w-6 h-6 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>)
                            :""}
                    {loading  ? "Adding..." : "Add"}
        </button>
        </form>
    </div>
  )
}

export default AddTopic