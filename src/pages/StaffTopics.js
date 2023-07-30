import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import PenIcon from "../components/icons/PenIcon"


const StaffTopics = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const userId = useGetUserId()
    const navigate = useNavigate()

    const loadTopics = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/staff/topics`, {
          headers: {
            authorization: cookies.access_token,
            id: userId
          }
        })
        setTopics(res.data);
      } catch (e) {
        toast.error(e?.message)
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
        if (userId && cookies.access_token) {
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
        <div className='flex flex-col justify-start items-center w-[70%] sm:w-full'>
          <p className='text-3xl my-2'>Topics</p>
          <p className='text-center text-sm'>List of topics you have added to the database</p>
          <hr className='w-[30rem] sm:w-[6rem] mb-8'/>
          <div className='flex flex-col gap-4 sm:px-4 mb-8'>
              {topics?.map(topic => (
                    <div className='border rounded p-4 w-[50rem] sm:w-full bg-yellow-50'>
                    <div className='flex justify-between mb-5 mt-2'>
                      <div className='text-xl '>{topic.title}</div>
                      <div className='mr-4'>
                        {/* <PenIcon/> */}
                      </div>
                    </div>
                    <div className='mb-8'>{topic.description}</div>
                    <div className='flex gap-4'>
                      <div className='flex flex-wrap gap-2'>
                        {topic?.categories?.toString().split(",").map(catg => (
                          <div className='border border-primary-500 rounded-md h-fit px-2 py-1'>{catg}</div>
                        ))}
                      </div>
                      {"|"}
                      <div className='border border-orange-300 rounded-md h-fit w-fit px-2 py-1'>{topic.expertise}</div>
                      {"|"}
                      <div className='flex flex-wrap gap-2'>
                        {topic.tools.toString().split(",").map(lang => (
                          <div className='border border-teal-500 rounded-md px-2 py-1'>{lang}</div>
                        ))}
                      </div>
                    </div>
                  </div>
              ))}
          </div>
          <Link to={"/staff/add"}>
            <button type="button" className="text-white w-[20rem] h-[4rem] sm:w-full sm:h-auto bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center flex justify-center items-center">
              Add
              <svg className="w-4 h-5 ml-4 text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/></svg>
            </button>
          </Link>
        </div>
    ):(
      <Loader/>
    )}
    </>
    
  )
}

export default StaffTopics