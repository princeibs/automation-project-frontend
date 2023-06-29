import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';
import PenIcon from "../components/icons/PenIcon"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
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

const StaffProfile = () => {
    const [userDetails, setUserDetails] = useState({})
    const [cookies, _] = useCookies(["access_token"]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const userId = useGetUserId()
    const navigate = useNavigate()

    const getUserDetails = async () => {
        try {
          setLoading(true)
          const res = await axios.post(`${baseUrl}/staff/details`, {id: userId});
          setUserDetails(res.data)
        } catch (e) {
          console.log(e)
        } finally {
          setLoading(false)
        }
      }

    const loadTopics = async () => {
      try {
        setLoading(true)
        const res = await axios.post(`${baseUrl}/staff/topics`, {id: userId})
        setTopics(res.data);
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
        if (userId && cookies.access_token) {
            getUserDetails();
            loadTopics();
        } else {
          toast.warning("Please log in to continue");
          navigate("/staff/login")
        }
    }, [userId, cookies.access_token])
    
  return (
    <>
    {
      !loading? (
        <div className='flex flex-col justify-start items-center w-[70%]'>
          <p className='text-3xl my-2'>Profile Information</p>
          <hr className='w-[15rem] mb-8'/>
          <div className='flex justify-between w-[60vw] mb-[8rem]'>
              <div className='flex justify-center items-center w-[50%] h-[50%]'>
                  <img className='rounded-full w-[20rem] border-4 border-primary-300' src={userDetails.image}/>
              </div>
              <div className='w-[50%] flex flex-col gap-5 text-slate-500'>
                  <div className='flex'>
                      <div className='mr-4'>Title:</div><div className='text-black border px-2 py-1 border-slate-300 rounded'>{userDetails.title}</div>
                  </div>
                  <div className='flex'>
                      <div className='mr-4'>Email:</div><div className='text-black border px-2 py-1 border-slate-300 rounded'>{userDetails.email}</div>
                  </div>
                  <div className='flex'>
                      <div className='mr-4'>First Name:</div><div className='text-black border px-2 py-1 border-slate-300 rounded'>{userDetails.firstName}</div>
                  </div>
                  <div className='flex'>
                      <div className='mr-4'>Last Name:</div><div className='text-black border px-2 py-1 border-slate-300 rounded'>{userDetails.lastName}</div>
                  </div>
                  <div className='flex'>
                      <div className='mr-4'>Other Name(s):</div><div className='text-black border px-2 py-1 border-slate-300 rounded'>{userDetails.otherNames}</div>
                  </div>
                  <div className='flex'>
                      <div className='mr-4'>Qualifications:</div><div className='text-black border px-2 py-1 border-slate-300 rounded'>{userDetails.qualifications}</div>
                  </div>
                  <div className='flex'>
                      <div className='mr-4'>Areas of specialization:</div><div className='text-black flex gap-2'>
                        {userDetails.specialization?.map(area => 
                          (<div className='border px-2 py-1 border-slate-300 rounded'>
                            {aos.filter(obj => obj.value == area)[0].name}
                          </div>
                          ))
                        }</div>
                  </div>
              </div>
          </div>

          <div className=' flex w-[50rem] justify-between items-center'>
              <div className='w-[7rem]'></div>
              <p className='text-3xl my-2'>Topics</p>
              <Link to={"/staff/add"}>
                <button type="button" className="text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                  Add Topic
                  <svg className="w-4 h-5 ml-4 text-gray-800 text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/></svg>
                </button>
              </Link>
              
          </div>
          <hr className='w-[15rem] mb-8'/>
          <div className='flex flex-col gap-4'>
              {topics?.map(topic => (
                    <div className='border rounded p-4 w-[50rem] bg-yellow-50'>
                    <div className='flex justify-between mb-5 mt-2'>
                      <div className='text-xl '>{topic.title}</div>
                      <div className='mr-4'>
                        <PenIcon/>
                      </div>
                    </div>
                    <div className='mb-8'>{topic.description}</div>
                    <div className='flex gap-4'>
                      <div className='border rounded-md h-fit w-fit px-2 py-1'>{topic.expertise}</div>
                      {"|"}
                      <div className='flex gap-2'>
                        {topic.tools.toString().split(",").map(lang => (
                          <div className='border rounded-md px-2 py-1'>{lang}</div>
                        ))}
                      </div>
                    </div>
                  </div>
              ))}
          </div>
        </div>
    ):(
      <div>Loading</div>
    )}
    </>
    
  )
}

export default StaffProfile