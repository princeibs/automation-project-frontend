import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../../hooks/useGetUserId';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../helpers/config';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const StaffStudents = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const userId = useGetUserId()
    const navigate = useNavigate()

    const loadStudents = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/staff/students`, {
          headers: {
            authorization: cookies.access_token,
            id: userId
          }
        })
        setStudents(res.data);
      } catch (e) {
        toast.error(e?.message)
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
        if (userId && cookies.access_token) {
            loadStudents();
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
          <p className='text-3xl my-2'>Student(s) ({students.length})</p>
          <p className='text-center text-sm'>Details of students under your supervision</p>
          <hr className='w-[30rem] sm:w-[6rem] mb-8'/>
          {students.length ? (
            <div className='flex flex-col items-center gap-4 mb-8'>
              {students.map(student => (
                 <table class="w-full text-sm text-left text-black">
                 <tbody>
                     <tr class="border-b border-gray-700">
                         <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                            Full Name
                         </th>
                         <td class="px-6 py-4 w-[70%] bg-white text">
                            {student.lastName} {student.firstName} {student.otherNames}
                         </td>
                     </tr>
                     <tr class="border-b border-gray-700">
                         <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                            Matric Number
                         </th>
                         <td class="px-6 py-4 w-[70%] bg-white text">
                          {String(student.matricNo).toUpperCase()}
                         </td>
                     </tr>
                     <tr class="border-b border-gray-700">
                         <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                            Topic title
                         </th>
                         <td class="px-6 py-4 w-[70%] bg-white text">
                            {student.title}
                         </td>
                     </tr>
                     <tr class="border-b border-gray-700">
                         <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                            Topic Description
                         </th>
                         <td class="px-6 py-4 w-[70%] bg-white text">
                            {student.description}
                         </td>
                     </tr>
                 </tbody>
             </table>
              ))}
          </div>
          ) : 
          (<div className='text-2xl'>No student assigned to you yet</div>)}
        </div>
    ):(
      <Loader/>
    )}
    </>
    
  )
}

export default StaffStudents