import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
//import bgImage from "./images/automation_bg.jpeg"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='bg-primary-50'>
      <div className='w-[100vw] sm:hidden hidden justify-center items-center fixed border h-[6rem] bg-yellow-500'>This website is not mobile responsive yet. Please view only on a desktop device</div>
      {/* <img className='index-image' src={bgImage}/> */}
      <App />
    </div>
  </React.StrictMode>
);