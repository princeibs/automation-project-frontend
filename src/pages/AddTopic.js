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
        if (cookies.access_token && userId) {
            try {
                const processedTools = tools.split(",").map(tool => String(tool).toLowerCase()).toString();
                const res = await axios.post(`${baseUrl}/staff/add`, {userId, title, description, levelOfExpertise, tools: processedTools});
                clear();
                window.location.assign("/staff/profile");
                toast.success("Topic created successfully");
                //navigate("staff/profile", {replate: true})
            } catch (e) {
                console.log(e)
            }
        } else {
            toast.warning("Please login before adding topic");
            window.location.assign("/staff/login");
            //navigate("/staff/login");
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
        <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add</button>
        </form>
    </div>
  )
}

export default AddTopic