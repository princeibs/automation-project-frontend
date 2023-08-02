import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../../hooks/useGetUserId';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../helpers/config';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';


const AdminStaffs = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const [supervisors, setSupervisors] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const userId = useGetUserId()
    const navigate = useNavigate()

    const loadStudents = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/admin/supervisors`, {
          headers: {
            authorization: cookies.access_token,
            id: userId
          }
        })
        setSupervisors(res.data);
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
          navigate("/admin/login")
        }
    }, [userId, cookies.access_token])
    
  return (
    <>
    {
      !loading? (
        <div className='flex flex-col justify-start items-center w-[70%] sm:w-full'>
          <p className='text-3xl my-2'>Project Supervisor ({supervisors.length})</p>
          <p className='text-center text-sm'>List of all project supervisors</p>
          <hr className='w-[30rem] sm:w-[6rem] mb-8'/>
          {supervisors.length ? (
            <div className='flex flex-col items-center gap-4 mb-8'>
              {supervisors.map(supervisor => (
                 <table class="w-full text-sm text-left text-black">
                 <tbody>
                     <tr class="border-b border-gray-700">
                         <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                            Full Name
                         </th>
                         <td class="px-6 py-4 w-[70%] bg-white text hover:underline">
                            <Link to={`/admin/supervisor/${supervisor._id}`}>
                                {supervisor.title} {String(supervisor.lastName).toUpperCase()} {supervisor.firstName} {supervisor.otherNames}
                            </Link>
                         </td>
                     </tr>
                     <tr class="border-b border-gray-700">
                         <th scope="row" class="px-6 py-4 w-[30%] font-medium whitespace-nowrap text-white bg-gray-600">
                            No. of students allocated
                         </th>
                         <td class="px-6 py-4 w-[70%] bg-white text">
                            {supervisor.students}
                         </td>
                     </tr>
                 </tbody>
             </table>
              ))}
          </div>
          ) : 
          (<div className='text-2xl'>Cannot find any registered supervisor</div>)}
        </div>
    ):(
      <Loader/>
    )}
    </>
    
  )
}

export default AdminStaffs