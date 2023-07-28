import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useGetUserId } from '../hooks/useGetUserId';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import UploadImage from '../components/UploadImage';

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

const StaffProfile = () => {
    const [userDetails, setUserDetails] = useState({})
    const [cookies, _] = useCookies(["access_token"]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    const [newImage, setNewImage] = useState(userDetails.image)
    
    const userId = useGetUserId()
    const navigate = useNavigate()

    const upload = async (imageUrl) => {
      try {
          if (cookies.access_token && userId) {
              const res = await axios.put(`${baseUrl}/staff/uploadImage`, 
              {
                  newImage: imageUrl
              },{
                  headers: {
                      authorization: cookies.access_token,
                      id: userId
                  }
              });
              toast.success("Image uploaded");
              window.location.reload()
          } else {
              toast.warning("Please log in to continue");
              navigate("/");
          }
      } catch (e) {
          toast.error(e?.message)
          console.log(e)
      }
    }

    const getUserDetails = async () => {
        try {
          setLoading(true)
          const res = await axios.get(`${baseUrl}/staff/details`, {
            headers: {
              authorization: cookies.access_token,
              id: userId
            }
          });
          setUserDetails(res.data)
        } catch (e) {
          toast.error(e?.message)
          console.log(e)
        } finally {
          setLoading(false)
        }
      }

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
        <div className='flex flex-col justify-start items-center w-[70%] sm:w-full'>
          {/* Profile Information */}
          <p className='text-3xl my-2'>Profile Information</p>
          <hr className='w-[15rem] mb-8'/>
          <div className='flex flex-row sm:flex-col justify-between w-[60vw] sm:w-full mb-[8rem] p-0 sm:px-4'>
              <div className='flex flex-col justify-center items-center w-[50%] h-[50%] sm:w-full'>
                  <img className='rounded-full w-[20rem] h-[20rem] object-fit border-4 border-primary-300' src={newImage || userDetails.image}/>
                  <UploadImage setImage={setNewImage} upload={upload}/>
              </div>
              
              <div className='w-[50%] sm:w-auto mt-0 sm:mt-8 flex flex-col gap-5 text-slate-500'>
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
                  <div className='flex flex-wrap'>
                      <div className='mr-4'>Areas of specialization:</div>
                      <div className='text-black flex gap-2 flex-wrap'>
                        {userDetails.specialization?.map(area => 
                          (<div className='border px-2 py-1 border-slate-300 rounded'>
                            {aos.filter(obj => obj.value == area)[0].name}
                          </div>
                          ))
                        }</div>
                  </div>
              </div>
          </div>

          {/* Topics */}
          <div className='flex w-[50rem] sm:w-full justify-between items-center'>
              <div className='w-[7rem]'></div>
              <p className='text-3xl my-2'>Topics</p>
              <Link to={"/staff/add"}>
                <button type="button" className="text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                  Add Topic
                  <svg className="w-4 h-5 ml-4 text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/></svg>
                </button>
              </Link>
          </div>
          <hr className='w-[15rem] sm:w-[6rem] mb-8'/>
          <div className='flex flex-col gap-4 sm:px-4'>
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
        </div>
    ):(
      <Loader/>
    )}
    </>
    
  )
}

export default StaffProfile