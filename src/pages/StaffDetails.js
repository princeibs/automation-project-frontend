import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

// List of possible area of specialization
const aos = [
    {name: "Web development", value: "web"},
    {name: "Mobile App Development", value: "mobile"},
    {name: "Artificial Intelligence", value: "ai"},
    {name: "Machine Learning", value: "ml"},
    {name: "Data Science", value: "ds"},
    {name: "Cyber Security", value: "cs"},
    {name: "Blockchain Engineering", value: "blockchain"},
    {name: "Internet of Things", value: "iot"},
    {name: "Others", value: "others"}
  ]

const StaffDetails = () => {

    const {id} = useParams()

    const [userDetails, setStaffDetails] = useState({});
    const [loading, setLoading] = useState(false);

    const getStaffDetails = async () => {
        try {
          setLoading(true)
          const res = await axios.get(`${baseUrl}/auth/staff-details/${id}`);
          setStaffDetails(res.data)
          console.log(res.data)
        } catch (e) {
          toast.error(e?.message)
          console.log(e)
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getStaffDetails();
        } 
    }, [id])

    return (
        <>
        {
          !loading? (
            <div className='flex flex-col justify-start items-center w-[70%] sm:w-full'>
              {/* Profile Information */}
              <p className='text-3xl my-2'>Details</p>
              <p className='text-center text-sm'>Staff personal details</p>
              <hr className='w-[15rem] mb-8'/>
              <div className='flex flex-col justify-center items-center w-[50vw] sm:w-full mb-[4rem]'>
                  <div className='flex flex-col justify-center items-center w-[50%] h-[50%] sm:w-full mb-4'>
                      <img className='rounded-full w-[20rem] h-[20rem] object-fit border-4 border-primary-300' src={userDetails.image}/>
                  </div>
                <div class="shadow-md mb-8">
                    <table class="w-full text-sm text-left text-black">
                        <tbody>
                            <tr class="border-b border-gray-700">
                                <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                    Title
                                </th>
                                <td class="px-6 py-4 w-[70%] bg-white text">
                                    {userDetails.title}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-700">
                                <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                    First Name
                                </th>
                                <td class="px-6 py-4 w-[70%] bg-white text">
                                    {userDetails.firstName}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-700">
                                <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                    Last Name
                                </th>
                                <td class="px-6 py-4 w-[70%] bg-white text">
                                    {userDetails.lastName}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-700">
                                <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                    Other Names
                                </th>
                                <td class="px-6 py-4 w-[70%] bg-white text">
                                    {userDetails.otherNames}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-700">
                                <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                    Email
                                </th>
                                <td class="px-6 py-4 w-[70%] bg-white text">
                                    {userDetails.email}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-700">
                                <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                    Qualifications
                                </th>
                                <td class="px-6 py-4 w-[70%] bg-white text">
                                    {userDetails.qualifications}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-700">
                                <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                                    Areas of specialization
                                </th>
                                <td class="px-6 py-4 w-[70%] bg-white text">
                                <div className='text-black flex gap-2 flex-wrap'>
                                {userDetails.specialization?.map(area => 
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
            </div>
        ):(
          <Loader/>
        )}
        </>
        
      )
}

export default StaffDetails