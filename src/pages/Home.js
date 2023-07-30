import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [cookies, _] = useCookies(["access_token"])
  const role = window.localStorage.getItem("role"); // 1 = staff, 2 = student
  return (
    <div className='flex mx-[5rem] border-0 flex-row sm:flex-col sm:m-0 sm:p-0 min-h-[80vh]'>
      {cookies.access_token? (
      <>
       {role == 2 && (
        <div className='w-[60%] text-left sm:w-full sm:text-center sm:px-4'>
          <p className='text-8xl pt-8 pl-4 leading-[8rem] sm:text-4xl sm:p-0 sm:leading-normal'>Need a <span className='text-yellow-800'>Topic</span> for your final year project proposal or research?</p>
          <p className='text-3xl mt-16 ml-4 mr-4 leading-[3rem] sm:text-xl sm:m-0 sm:mt-4'>Explore our research website to get final year project topics related to computer science for your project proposal</p>
        </div>
      )}
      </>
      ) : (
          <div className='w-[60%] text-left sm:w-full sm:text-center sm:px-4'>
            <p className='text-8xl pt-8 pl-4 leading-[8rem] sm:text-4xl sm:p-0 sm:leading-normal'>Need a <span className='text-yellow-800'>Topic</span> for your final year project proposal or research?</p>
            <p className='text-3xl mt-16 ml-4 mr-4 leading-[3rem] sm:text-xl sm:m-0 sm:mt-4'>Explore our research website to get final year project topics related to computer science for your project proposal</p>
          </div>
        )
      }
      <div className={`rounded-lg w-[40%]  sm:border-0 mt-8 ${role == 2 ? 'border bg-primary-100' : ''} sm:bg-primary-50 flex flex-col justify-center items-center  sm:w-[90%] sm:mx-auto`}>
        {cookies.access_token? (
          <>
          {/* Staff */}
            {role == 1 ? (
              <>
                <Link to={"/staff/add"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-primary-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Add topic</div></Link>
                <Link to={"/staff/topics"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>View Topics</div></Link>
                <Link to={"/staff/students"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-green-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>View Students</div></Link>
                <Link to={"/staff/profile"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>View profile</div></Link>
              </>
            ): role == 2? (
            <>
              <Link to={"/search"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Search topic</div></Link>
              <Link to={"/supervisor-topic"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>View Supervisor/Topic</div></Link>
            </>) : <></>}
          </>
        ) : (
          <>
            <Link to={"/register"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Register</div></Link>
            <Link to={"/login"}><div className='w-[26rem] sm:w-[20rem] flex justify-center items-center h-[5rem] mt-[2rem] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center'>Login</div></Link>
          </>
            )}
      </div>
    </div>
  )
}

export default Home