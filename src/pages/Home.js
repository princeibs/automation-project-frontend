import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [cookies, _] = useCookies(["access_token"])
  const role = window.localStorage.getItem("role"); // 1 = staff, 2 = student
  return (
    <div className='flex mx-[5rem]'>
      <div className='w-[60%]'>
        <p className='text-8xl pt-8 pl-4 leading-[8rem]'>Need a <span className='text-yellow-800'>Topic</span> for your project or research?</p>
        <p className='text-3xl mt-16 ml-4 leading-[3rem]'>Search for books on our research website by typing keywords related to your topic</p>
      </div>
      <div className='rounded-lg w-[40%] mt-8 bg-primary-100 flex justify-center items-center'>
        {cookies.access_token? (
          <>
          {/* Staff */}
            {role == 1 ? (
              <div className=''>
                <Link to={"/staff/add"}><div className='w-[26rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Add Topic</div></Link>
                <Link to={"/staff/profile"}><div className='w-[26rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>View profile</div></Link>
              </div>
            ): role == 2? (
            <div className=''>
              <Link to={"/search"}><div className='w-[26rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Search for topic</div></Link>
              <Link to={"/saved"}><div className='w-[26rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>View saved topics</div></Link>
            </div>) : <></>}
          </>
        ) : (
          <div className=''>
            <Link to={"/register"}><div className='w-[26rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Register</div></Link>
            <Link to={"/login"}><div className='w-[26rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Login</div></Link>
          </div>
        )}
      
      </div>
    </div>
  )
}

export default Home