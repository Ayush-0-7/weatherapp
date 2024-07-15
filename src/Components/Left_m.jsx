import React, { useEffect, useState } from 'react'
import './Left_m.css'
import { useSelector } from 'react-redux';
import lodash from 'lodash';
const Left_m = () => {
  const weather = useSelector(state=>state.weather);
  const [time,settime] = useState('');
  const updatetime = () => {
     let now = new Date();
     const longTime = now.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', second: 'numeric' });  // HH:MM:SS (24-hour)
     settime(longTime);
  }
  setInterval(updatetime,1000);

  
  return (
    <div id='left' className='h-full w-[60%]'>
    <img src={'../src/images/city.jpg'} alt="Full Screen Image" className='h-full rounded-tl-md rounded-bl-md' style={{objectFit:"cover"}}/>
    <div id='l1' className='text-white text-ellipsis overflow-auto text-right text-2xl'>
       {lodash.capitalize(weather.city)} <br />
       IN
    </div>
    <div id='l2' className='text-white text-left '>
      {time} <br />
      {new Date().getDate()+" "+new Date().toLocaleString('en-US', { month: 'short' })+" "+new Date().getFullYear()}
    </div>
    <div id='l3' className='text-white text-left text-5xl'>
       {weather.temp}°C
    </div>
    </div>
  )
}

export default Left_m