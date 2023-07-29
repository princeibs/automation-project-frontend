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
import { Link } from 'react-router-dom';

// List of possible area of specialization
const tools = [
  {name: "Python", value: "python"},
  {name: "Java", value: "java"},
  {name: "JavaScript", value: "javascript"},
  {name: "PHP", value: "php"},
  {name: "C", value: "c"},
  {name: "C++", value: "cpp"},
  {name: "C#", value: "csharp"},
  {name: "Rust", value: "rust"},
  {name: "Solidity (Ethereum)", value: "solidity"},
  {name: "Swift", value: "swift"},
  {name: "Arduino", value: "arduino"},
  {name: "TensorFlow", value: "tensorflow"},
  {name: "Kotlin", value: "kotlin"},
  {name: "MATLAB", value: "matlab"},
  {name: "React Native", value: "react-native"},
  {name: "Unity (C#)", value: "unity-csharp"},
  {name: "MIDI Libraries", value: "midi-libraries"},
  {name: "Others", value: "others"},
]

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

const Search = ({handleSearch, loading}) => {
    const [areaOfSpecialization, setAreaOfSpecialization] = useState('');
    const [levelOfExpertise, setLevelOfExpertise] = useState('');
    const [programmingLanguages, setProgrammingLanguages] = useState([]);
    const [searchType, setSearchType] = useState("narrow");

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
        <option value="ai">AI</option>
        <option value="ml">ML</option>
        <option value="aiml">AI/ML</option>
        <option value="iot">Internet of things (IOT)</option>
        <option value="others">Others</option>
      </select>

      <label for="" class="mb-2 font-semibold text-gray-900">Level of Expertise</label>
      <select id="" onChange={e => setLevelOfExpertise(e.target.value)} class="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        <option selected>What is your level of expertise</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="expert">Expert</option>
      </select>
      
      <p class="mb-1 font-semibold text-gray-900">Programming languages</p>
      <p className='text-sm mb-2'>Which of the programming languages/tools are you familar with?</p>
      <ul class="flex flex-wrap gap-1 mb-6 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
            {tools.map(({name, value}) => (
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
        <div className='flex flex-col w-[50%]'>
          <div class="flex w-full items-center border border-gray-400 rounded pl-4">
            <input id="bordered-radio-2" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" value="narrow" name="Narrow search" checked={searchType == "narrow"} onChange={e => setSearchType(e.target.value)}/>
            <label for="bordered-radio-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900">Narrow Search</label>
          </div>
          <p className='text-xs'><span className='underline text-yellow-600'>*Note: </span>Use Narrow Search if topics must match ALL the search parameters above</p>
        </div>
        <div className='flex flex-col w-[50%]'>
           <div class="flex w-full items-center pl-4 border border-gray-400 rounded">
            <input id="bordered-radio-1" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" value="broad" name="Broad search" checked={searchType == "broad"} onChange={e => setSearchType(e.target.value)}/>
            <label for="bordered-radio-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900">Broad Search</label>
          </div>
          <p className='text-xs'><span className='underline text-yellow-600'>*Note: </span>Use Broad Search if you want topics to match ATLEAST ONE of the search parameters above</p>
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

const Recommended = ({showSearch, topics, copy, save, unSave, saved, loading, searchType, expertise, tools, specialization}) => {
    return (<>
        {!loading ? (
            <div className='px-3'>
            <div className='text-4xl mx-auto mb-[1rem] w-fit text-center'>Recommended Topics ({topics?.length})</div>
            {searchType == "narrow" && (
              <div className='mx-auto mb-[2rem] text-green-900 text-sm'>
                <p className='text-base font-bold'>Topics must meet ALL of the following criteria:</p>
                <p>1. {String(expertise).toUpperCase()} skill level.</p>
                <p>2. Can be implemented using any of the tools/languages: {tools.toString().toUpperCase()}.</p>
                <p>3. It is {specialization.toString().toUpperCase()} based.</p>
              </div> 
            )}
            {searchType == "broad" && (
              <div className='mx-auto mb-[2rem] text-green-900 text-sm'>
                <p className='text-base font-bold'>Topics must meet ATLEAST ONE of the following criteria:</p>
                <p>1. {String(expertise).toUpperCase() || "_"} skill level.</p>
                <p>2. Can be implemented using any of the tools/languages: {tools.toString().toUpperCase() || "_"}.</p>
                <p>3. It is {specialization.toString().toUpperCase() || "_"} based.</p>
              </div> 
            )}
            {/* Topics */}
            <div className='m-auto w-fit flex gap-3 flex-col'>
              {topics.length == 0 && (
                  <div className='underline my-4'>The criteria above did not match any topic in the database</div>
              )}
              {topics.length > 0 && (<>
                {topics.map(topic => (
                  <div className='border rounded p-4 w-[50rem] sm:w-full bg-yellow-50'>
                    <div className='flex justify-between items-start mb-5 mt-2 mr-2'>
                      {/* Title */}
                      <div className='text-xl '>{topic.title}</div>
                      {/* Actions */}
                      <div className='flex items-center justify-between gap-3'>
                        {saved.includes(topic._id) ? 
                          <StarIconFull onClick={() => unSave(topic._id)}/> : 
                          <StarIcon onClick={() => save(topic._id)}/> 
                        }
                        <CopyIcon onClick={async () => await copy(`${topic.title}\n\n${topic.description}`).then(() => toast.success("Copied to clipboard"))}/>
                      </div>
                    </div>
                    {/* Description */}
                    <div className='mb-8'>{topic.description}</div>
                    {/* Topic Info */}
                    <div className='flex justify-between items-center flex-wrap'>
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
                      <Link to={`/staff-details/${topic.createdBy._id}`}>
                        <div className='flex gap-3 items-center justify-center'>
                          <img className='h-[30px] w-[30px] rounded-full' src={topic.createdBy.image}/>
                          {topic.createdBy.title} {topic.createdBy.firstName} {topic.createdBy.lastName}
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </>)}
            </div>
            <div className='m-auto w-fit mt-[3rem]'>Can't find a suitable topic? <button onClick={showSearch} className='underline text-primary-500'>Search again</button></div>
            </div>
        ): (
            <Loader/>
        )}
        </>
    )
}

const SEARCH = "search";
const RECOMMENDED = "recommended"

const SearchTopic = () => {
    const [recommendedTopics, setRecommendedTopics] = useState([])
    const [savedTopics, setSavedTopics] = useState([])
    const [display, setDisplay] = useState(SEARCH);
    const [loading, setLoading] = useState(false)
    const [searchType, setSearchType] = useState("")
    const [expertise, setExpertise] = useState("")
    const [tools, setTools] = useState([])
    const [specialization, setSpecialization] = useState("")

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
        e.preventDefault();
        if (searchType == "narrow") {
          if (!areaOfSpecialization) {
            toast.warn("To perform a Narrow Search, you must select area of specialization")
            return
          }
          if (!levelOfExpertise) {
            toast.warn("To perform a Narrow Search, you must select level of expertise")
            return
          }
          if (!programmingLanguages.length) {
            toast.warn("To perform a Narrow Search, you must choose atleast one language/tool")
            return
          }
        }
        try {
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
            setSearchType(searchType)
            setExpertise(levelOfExpertise)
            setTools(programmingLanguages)
            setSpecialization(areaOfSpecialization)

            setSavedTopics(_saved.data);
            setRecommendedTopics(recommended.data);
            setDisplay(RECOMMENDED);
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
            {display == SEARCH && <Search 
                                handleSearch={handleSearch} loading={loading}
                              />}
            {display == RECOMMENDED && <Recommended 
                                copy={copyTextToClipboard} 
                                showSearch={() => setDisplay(SEARCH)} 
                                topics={recommendedTopics} 
                                save={save} 
                                unSave={unSave} 
                                saved={savedTopics} 
                                loading={loading}
                                searchType={searchType}
                                expertise={expertise}
                                tools={tools}
                                specialization={specialization}
                            />}
        </>
    )
}

export default SearchTopic