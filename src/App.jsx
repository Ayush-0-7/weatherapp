import { useState,useEffect } from 'react'
import './App.css'
import Left_m from './Components/Left_m'
import Right_m from './Components/Right_m'
import loading from '../src/images/WeatherIcons.gif'
import { useSelector } from 'react-redux'
function App() {
  const loader = useSelector(state=>state.loader);
  return (
    <>
        <div>
        <img src="../src/images/background1.jpg" alt="Full Screen Image" className="absolute inset-0 object-cover w-full h-full brightness-70"/>
        <div id='main' className=' w-full h-full md:h-[75%] md:w-[60%] rounded-md flex'>
          {
            loader == false ?
            <><Left_m/>
            <Right_m/></>:
            <img src={loading} alt="Loading" className='h-full w-full' style={{objectFit:"cover"}} />

          }
        </div>
        </div>
      
    </>
  )
}

export default App
