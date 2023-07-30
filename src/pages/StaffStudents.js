import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


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
                <div className='border rounded p-4 w-[50rem] sm:w-full bg-white'>
                  <p className='text-gray-500'>Full Name: <span className='font-mono text-black'>{student.lastName} {student.firstName} {student.otherNames}</span></p>
                  <p className='text-gray-500'>Matric Number: <span className='font-mono text-black'>{String(student.matricNo).toUpperCase()}</span></p>
                  <p className='text-gray-500'>Topic title: <span className='font-mono text-black'>{student.title}</span></p>
                  <p className='text-gray-500'>Topic Description: <span className='font-mono text-black'>{student.description}</span></p>
                </div>
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