import React, { useState, useEffect } from 'react'
import StarIconFull from '../components/icons/StarIconFull'
import CopyIcon from '../components/icons/CopyIcon'
import axios from 'axios';
import { baseUrl} from '../config'
import { useGetUserId } from '../hooks/useGetUserId';
import { toast } from 'react-toastify';

const SavedTopics = () => {
  const [savedTopics, setSavedTopics] = useState([]);
  const [loading, setLoading] = useState(false)

  const userId = useGetUserId();

  const getSaved = async () => {
    try {
      setLoading(true);
      const topicIds = (await axios.post(`${baseUrl}/auth/saved`, {userId})).data;
      const topics = [];
      for (let i = 0; i < topicIds.length; i++) {
        const topic  = await axios.get(`${baseUrl}/auth/topic/${topicIds[i]}`)
        topics.push(topic.data)
      }
      setSavedTopics(topics)
      
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

const unSave = async (topicId) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/unsave`, {userId, topicId});
      console.log(res)
      await getSaved();
      toast.success("Unsaved")
    } catch (e) {
       console.log(e) 
    }
}

  useEffect(() => {
    getSaved();
  }, [])

  return (
    <>
    {!loading ? (
      <div className=''>
        <div className='text-4xl mx-auto mb-[1rem] w-fit'>Saved Topics</div>
        <p className='mx-auto mb-[2rem] w-fit'>List of topics you have saved</p>
        <div className='m-auto w-fit flex gap-3 flex-col'>
          {savedTopics.map(topic => (
            <div className='border rounded p-4 w-[50rem]'>
              <div className='flex justify-between mb-5 mt-2'>
                <div className='text-xl '>{topic.title}</div>
                <div className='flex items-center justify-between gap-3'>
                  <StarIconFull onClick={() => unSave(topic._id)}/>
                  <CopyIcon/>
                </div>
              </div>
              <div className='mb-8'>{topic.description}</div>
              <div className='flex gap-4 items-center'>
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
      ) : (
      <div>Loading...</div>)}
    </>
  )
}

export default SavedTopics