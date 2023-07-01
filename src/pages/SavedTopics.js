import React, { useState, useEffect } from 'react'
import StarIconFull from '../components/icons/StarIconFull'
import CopyIcon from '../components/icons/CopyIcon'
import axios from 'axios';
import { baseUrl} from '../config'
import { useGetUserId } from '../hooks/useGetUserId';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useCookies } from 'react-cookie';

const SavedTopics = () => {
  const [savedTopics, setSavedTopics] = useState([]);
  const [loading, setLoading] = useState(false)

  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"])

  const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(text)
    } else {
      document.execCommand('copy', true, text);
    }
  }

  const getSaved = async () => {
    try {
      setLoading(true);
      const topicIds = (await axios.get(`${baseUrl}/auth/saved`, {
        headers: {
          authorization: cookies.access_token,
          id: userId
      }})).data;
      const topics = [];
      for (let i = 0; i < topicIds.length; i++) {
        const topic  = await axios.get(`${baseUrl}/auth/topic/${topicIds[i]}`)
        topics.push(topic.data)
      }
      setSavedTopics(topics)
      
    } catch (e) {
      toast.error(e?.message)
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

const unSave = async (topicId) => {
    try {
      const res = await axios.put(`${baseUrl}/auth/unsave`, {userId: userId, topicId}, {
        headers: {
          authorization: cookies.access_token
        }
      });
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
      <div className='min-h-[80vh] w-full'>
        <div className='text-4xl mx-auto mb-[1rem] w-fit'>Saved Topics</div>
        <p className='mx-auto mb-[2rem] w-fit'>List of topics you have saved</p>
        <div className='m-auto w-fit sm:w-full flex gap-3 flex-col sm:p-2'>
          {savedTopics.length > 0 ? 
            <>
              {savedTopics.map(topic => (
              <div className='border-2 bg-green-50 rounded p-4 w-[50rem] sm:w-full'>
                <div className='flex justify-between mb-5 mt-2'>
                  <div className='text-xl '>{topic.title}</div>
                  <div className='flex items-center justify-between gap-3'>
                    <StarIconFull onClick={() => unSave(topic._id)}/>
                    <CopyIcon onClick={async () => await copyTextToClipboard(`${topic.title}\n\n${topic.description}`).then(() => toast.success("Copied to clipboard"))}/>
                  </div>
                </div>
                <div className='mb-8'>{topic.description}</div>
                <div className='flex gap-4 items-start'>
                  <div className='border border-yellow-400 rounded-md h-fit w-fit px-2 py-1'>{topic.expertise}</div>
                  {"|"}
                  <div className='flex flex-wrap gap-2'>
                    {topic.tools.toString().split(",").map(lang => (
                      <div className='border border-lime-600 rounded-md px-2 py-1'>{lang}</div>
                    ))}
                  </div>
                </div>
              </div>
              ))}
            </>:
              <div className='underline text-sm'>You have not saved any topics yet</div>
            }
        </div>
      </div>
      ) : (
      <Loader/>
      )}
    </>
  )
}

export default SavedTopics