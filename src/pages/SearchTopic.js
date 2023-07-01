import React, { useEffect, useState } from 'react'
import StarIcon from '../components/icons/StarIcon'
import CopyIcon from '../components/icons/CopyIcon'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import { baseUrl } from '../config';
import StarIconFull from '../components/icons/StarIconFull';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Loader from '../components/Loader';

// List of possible area of specialization
const aos = [
    {name: "Python", value: "python"},
    {name: "Java", value: "java"},
    {name: "JavaScript", value: "javascript"},
    {name: "PHP", value: "rust"},
    {name: "C", value: "c"},
    {name: "C++", value: "cpp"},
    {name: "Rust", value: "rust"},
    {name: "Python", value: "python"},
    {name: "Java", value: "java"},
    {name: "JavaScript", value: "javascript"},
    {name: "PHP", value: "rust"},
    {name: "C", value: "c"},
    {name: "C++", value: "cpp"},
    {name: "Rust", value: "rust"}
]

const Search = ({handleSearch, loading}) => {
    const [areaOfSpecialization, setAreaOfSpecialization] = useState('');
    const [levelOfExpertise, setLevelOfExpertise] = useState('');
    const [programmingLanguages, setProgrammingLanguages] = useState([]);
    const [searchType, setSearchType] = useState("inclusive");

    const handleProgrammingLanguagesChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setProgrammingLanguages(prevLanguages => [...prevLanguages, value]);
        } else {
            setProgrammingLanguages(prevLanguages =>
            prevLanguages.filter(language => language !== value)
            );
        }
    };

    const formSubmit = (e) => handleSearch(e, areaOfSpecialization, levelOfExpertise, programmingLanguages, searchType)

  return (
   <div className='w-auto sm:w-full sm:px-3'>
    <div className='text-4xl mx-auto mb-[1rem] w-fit'>Search for topic</div>
    <p className='mx-auto mb-[2rem] w-fit text-center'>Enter the description of the topic you want to work on</p>
    <form className='w-[50rem] sm:w-full m-auto' onSubmit={formSubmit}>
      <label for="areaOfSpecialization" class="mb-2 font-semibold text-gray-900">Area of specialization</label>
      <select id="" onChange={e => setAreaOfSpecialization(e.target.value)} class="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        <option selected>What is your area of specialization</option>
        <option value="web">Web development</option>
        <option value="mobile">Mobile development</option>
        <option value="aiml">AI/ML</option>
        <option value="iot">Internet of things (IOT)</option>
      </select>

      <label for="" class="mb-2 font-semibold text-gray-900">Level of Expertise</label>
      <select id="" onChange={e => setLevelOfExpertise(e.target.value)} class="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        <option selected>What is your level of expertise</option>
        <option value="novice">Novice</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
      </select>
      
      <p class="mb-1 font-semibold text-gray-900">Programming languages</p>
      <p className='text-sm mb-2'>Which of the programming languages/tools are you familar with?</p>
      <ul class="flex flex-wrap gap-1 mb-6 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
            {aos.map(({name, value}) => (
                <li class="w-auto px-1 border-b border-gray-500 sm:border-b sm:border-r">
                    <div class="flex items-center pl-3">
                        <input id={value} type="checkbox" name={name} value={value} onChange={handleProgrammingLanguagesChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                        <label for={value} class="w-full py-3 ml-2 text-sm font-medium text-gray-900">{name}</label>
                    </div>
                </li>
            ))}
      </ul>

      <label for="" class="mb-1 font-semibold text-gray-900">Search Type</label>
      <div className='flex justify-between gap-5'>
        <div class="flex w-[50%] items-center pl-4 border border-gray-400 rounded">
            <input id="bordered-radio-1" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" value="inclusive" name="Inclusive search" checked={searchType == "inclusive"} onChange={e => setSearchType(e.target.value)}/>
            <label for="bordered-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900">Inclusive Search(OR)</label>
        </div>
        <div class="flex w-[50%] items-center border border-gray-400 rounded pl-4">
            <input id="bordered-radio-2" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" value="exclusive" name="Exclusive search" checked={searchType == "exclusive"} onChange={e => setSearchType(e.target.value)}/>
            <label for="bordered-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900">Exclusive Search(AND)</label>
        </div>
      </div>
      <button disabled={loading} type="submit" class="w-full h-[3rem] mt-[2rem] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-300">
        {loading ? (<svg aria-hidden="true" role="status" class="inline w-6 h-6 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                  </svg>)
                              :""}
          {loading  ? "Searching..." : "Search"}
      </button>
    </form>
   </div>
  )
}

const Recommended = ({showSearch, topics, copy, save, unSave, saved, loading}) => {
    return (<>
        {!loading ? (
            <div className='px-3'>
            <div className='text-4xl mx-auto mb-[1rem] w-fit'>Recommended</div>
            <p className='mx-auto mb-[2rem] w-fit text-center'>Below is a list of recommended topics based on your description</p>
            <div className='m-auto w-fit flex gap-3 flex-col'>
              {topics.map(topic => (
                <div className='border rounded p-4 w-[50rem] sm:w-full bg-yellow-50'>
                  <div className='flex justify-between items-start mb-5 mt-2 mr-2'>
                    <div className='text-xl '>{topic.title}</div>
                    <div className='flex items-center justify-between gap-3'>
                      {saved.includes(topic._id) ? 
                        <StarIconFull onClick={() => unSave(topic._id)}/> : 
                        <StarIcon onClick={() => save(topic._id)}/> 
                      }
                      <CopyIcon onClick={async () => await copy(`${topic.title}\n\n${topic.description}`).then(() => toast.success("Copied to clipboard"))}/>
                    </div>
                  </div>
                  <div className='mb-8'>{topic.description}</div>
                  <div className='flex gap-4'>
                    <div className='border rounded-md h-fit w-fit px-2 py-1'>{topic.expertise}</div>
                    {"|"}
                    <div className='flex flex-wrap gap-2'>
                      {topic.tools.toString().split(",").map(tool => (
                        <div className='border rounded-md px-2 py-1'>{tool}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='m-auto w-fit mt-[3rem]'>Can't find a suitable topic? <button onClick={showSearch} className='underline text-primary-500'>Search again</button></div>
            </div>
        ): (
            <Loader/>
        )}
        </>
    )
}

const SearchTopic = () => {
    const [recommendedTopics, setRecommendedTopics] = useState([])
    const [savedTopics, setSavedTopics] = useState([])
    const [display, setDisplay] = useState(1);
    const [loading, setLoading] = useState(false)

    const userId = useGetUserId();
    const [cookies, _] = useCookies(["access_token"]);

    const copyTextToClipboard = async (text) => {
      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(text)
      } else {
        document.execCommand('copy', true, text);
      }
    }

    const saved = async () => {
        try {
            const saved = await axios.get(`${baseUrl}/auth/saved`, {
              headers: {
                authorization: cookies.access_token, id: userId
              }
            });
            setSavedTopics(saved.data)
            return saved;
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearch = async (e, areaOfSpecialization, levelOfExpertise, programmingLanguages, searchType) => {
        try {
            e.preventDefault();
            setLoading(true);
            const recommended = await axios.get(`${baseUrl}/auth/search`, {
              headers: {
                authorization: cookies.access_token,
                specialization: areaOfSpecialization, 
                expertise: levelOfExpertise, 
                tools: programmingLanguages, 
                type: searchType
              }});
            const _saved = await saved();
            setSavedTopics(_saved.data);
            setRecommendedTopics(recommended.data);
            setDisplay(2);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const save = async (topicId) => {
        try {
          const res = await axios.put(`${baseUrl}/auth/save`, {userId, topicId}, {
            headers: {
              authorization: cookies.access_token
            }
          });
          await saved();
          toast.success("Saved")
        } catch (e) {
           console.log(e) 
        }
    }

    const unSave = async (topicId) => {
        try {
          const res = await axios.put(`${baseUrl}/auth/unsave`, {userId, topicId}, {
            headers: {
              authorization: cookies.access_token
            }
          });
          await saved();
          toast.success("Unsaved")
        } catch (e) {
           console.log(e) 
        }
    }

    useEffect(() => {
        if (userId) saved()
    }, [savedTopics])

    return (
        <>
            {display == 1 && <Search 
                                handleSearch={handleSearch} loading={loading}
                              />}
            {display == 2 && <Recommended 
                                copy={copyTextToClipboard} 
                                showSearch={() => setDisplay(1)} 
                                topics={recommendedTopics} 
                                save={save} 
                                unSave={unSave} 
                                saved={savedTopics} 
                                loading={loading}
                            />}
        </>
    )
}

export default SearchTopic