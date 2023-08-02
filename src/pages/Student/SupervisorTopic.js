import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { baseUrl} from '../../helpers/config'
import { useGetUserId } from '../../hooks/useGetUserId';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { aos } from '../../helpers/constants';

const SupervisorTopic = () => {
  const [loading, setLoading] = useState(false)
  const [studentDetails, setStudentDetails] = useState({})
  const [staffDetails, setStaffDetails] = useState({})
  const [topic, setTopicDetails] = useState({})

  const navigate = useNavigate();

  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"])

  const getUserDetails = async () => {
    try {
      setLoading(true)
      const student = await axios.get(`${baseUrl}/auth/details`, {headers: {authorization: cookies.access_token, id: userId}})
      setStudentDetails(student.data)
      if (student.data.selectedTopic && student.data.supervisor) {
        const staffId = student.data.supervisor
        const topicId = student.data.selectedTopic
        const staff = await axios.get(`${baseUrl}/auth/staff-details/${staffId}`);
        const topic = await axios.get(`${baseUrl}/auth/topic/${topicId}`)
        setStaffDetails(staff.data)
        setTopicDetails(topic.data)
      }
    } catch (e) {
      toast.error(e?.message)
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const unselect = async (topicId) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/unselect-topic`, {userId, topicId}, {
        headers: {
          authorization: cookies.access_token
        }
      });
      navigate("/search")
      toast.success("Topic removed successfully")
      toast.info("Please select another topic to get a new supervisor")
    } catch (e) {
       console.log(e) 
    }
}

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <>
    {!loading ? (
      <div className='flex flex-col justify-start items-center w-[70%] sm:w-full'>
        <div className='text-4xl mx-auto mb-1 w-fit'>Supervisor/Topic</div>
        <p className='mx-auto w-fit mb-2'>View your project supervisor and project topic</p>
        <hr className='w-[30rem] mb-8'/>
        {(studentDetails.selectedTopic && studentDetails.supervisor) ?
          <>
            {/* Supervisor */}
            <p className='underline mb-2'>Your Project Supervisor</p>
            <div className='flex flex-col justify-center items-center w-[50vw] sm:w-full mb-[4rem]'>
                      <div className='flex flex-col justify-center items-center w-[50%] h-[50%] sm:w-full mb-4'>
                          <img className='rounded-full w-[10rem] h-[10rem] object-fit border-4 border-primary-300' src={staffDetails.image}/>
                      </div>
                    <div class="shadow-md mb-8">
                        <table class="w-full text-sm text-left text-black">
                            <tbody>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        Title
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                        {staffDetails.title}
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        First Name
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                        {staffDetails.firstName}
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        Last Name
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                        {staffDetails.lastName}
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        Other Names
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                        {staffDetails.otherNames}
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        Email
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                        {staffDetails.email}
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        Qualifications
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                        {staffDetails.qualifications}
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        Areas of specialization
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                    <div className='text-black flex gap-2 flex-wrap'>
                                    {staffDetails.specialization?.map(area => 
                                      (<div className='border px-2 py-1 border-slate-300 rounded'>
                                        {aos.filter(obj => obj.value == area)[0].name}
                                      </div>
                                      ))
                                    }</div>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                        Published papers
                                    </th>
                                    <td class="px-6 py-4 w-[70%] bg-white text">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div> 
            {/* Topic */}
            <p className='underline mb-2'>Your Project Topic</p>
            <div className='border-2 bg-green-50 rounded p-4 w-[50rem] sm:w-full'>
                    <div className='flex justify-between mb-5 mt-2'>
                      <div className='text-xl '>{topic.title}</div>
                      <button onClick={() => unselect(topic._id)} type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Change Topic</button>
                    </div>
                    <div className='mb-8'>{topic.description}</div>
                    <div className='flex gap-4 items-start'>
                    <div className='flex flex-wrap gap-2'>
                      {topic?.categories?.toString().split(",").map(catg => (
                        <div className='border border-primary-500 rounded-md h-fit px-2 py-1'>{catg}</div>
                      ))}
                      </div>
                        {"|"}
                      <div className='border border-yellow-400 rounded-md h-fit w-fit px-2 py-1'>{topic.expertise}</div>
                      {"|"}
                      <div className='flex flex-wrap gap-2'>
                        {topic?.tools?.toString().split(",").map(lang => (
                          <div className='border border-lime-600 rounded-md px-2 py-1'>{lang}</div>
                        ))}
                      </div>
                    </div>
            </div>
          </> :
          <div className='text-center'>
            <p className='underline mb-8'>You need to select a topic first before you can see your supervisor</p>
            <p className='text-2xl'>Search and select topic <span className='underline'><Link to="/search">here</Link></span> to get assigned to a supervisor</p>
          </div>
         }
      </div>
      ) : (
      <Loader/>
      )}
    </>
  )
}

export default SupervisorTopic