import React, { useEffect, useRef, useState } from 'react'
import { GoSun } from "react-icons/go";
import './Right_m.css'
import { IoSearchCircle } from "react-icons/io5";
import { RiMistFill } from "react-icons/ri";
import { FaCloudRain } from "react-icons/fa";
import { LiaCloudSolid } from "react-icons/lia";
import { BsCloudHaze2 } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { addWeather, addloader } from '../features/weather/weatherSlice';
import lodash from 'lodash';
const Right_m = () => { 
   const city = useRef('jamshedpur');
   const [lon,setlon] = useState(0);
   const [lat,setlat] = useState(0);
   const [weather,setweather] = useState('');
   const [temp,settemp] = useState(0);
   const [humid,sethumid] = useState(0);
   const [visibile,setvisible] = useState(0);
   const [wind,setwind] = useState(0);
   const dispatch = useDispatch();
   const [error, setError] = useState(null);
   useEffect(()=>{
       const getLocation = async () => {

        if (navigator.geolocation) {
          
            const position = await navigator.geolocation.getCurrentPosition(async(pos) => {
              setlat(pos.coords.latitude)
              setlon(pos.coords.longitude)
              const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=e22b3f61b9dca5fbec42df6eb73864e4`)
              if(response.ok){
                const data = await response.json();
                city.current.value = data[0].name;
              }
              else{
                console.log("Fetching failed1.");
              }
              const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=e22b3f61b9dca5fbec42df6eb73864e4`);
              if(response2.ok){
                const data2 = await response2.json();
                setweather(data2.weather[0].main);
                    settemp(data2.main.temp);
                    sethumid(data2.main.humidity);
                    setvisible(data2.visibility);
                    setwind(data2.wind.speed);
                    dispatch(addWeather({city:city.current.value,temp:data2.main.temp}));
              }
              else{
                console.log("Fetch failed2.");
              }

            });
        } else {
          setError("Geolocation is not supported by this browser.");
        }
  


        
      }
      
      getLocation()
   },[])
   const handleClick = async() => {
        
            const response_1=await fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${city.current.value.toLowerCase()},ISO%203166-2:IN&appid=e22b3f61b9dca5fbec42df6eb73864e4`);
            if(response_1.ok){
                const data = await response_1.json();
                setlat(data[0].lat);
                setlon(data[0].lon);
                console.log(lon,"000 ",lat);
                
                    const response_2=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=e22b3f61b9dca5fbec42df6eb73864e4`);
                    console.log(lat,"&&&",lon);
                    if(response_2.ok){
                        const weather = await response_2.json();
                        setweather(weather.weather[0].main);
                        settemp(weather.main.temp);
                        sethumid(weather.main.humidity);
                        setvisible(weather.visibility);
                        setwind(weather.wind.speed);
                        dispatch(addWeather({city:city.current.value,temp:weather.main.temp}))
    
                    }
    
            
                    else{
                        console.log("Fetch fail3.");
                    }
    
            }
            else{
                console.log("Fetch fail1.");
            }
        




  } 
return (
      <div className='h-full w-[40%]'>
    <div className='text-center text-3xl text-white'>
          {/* Apply condition here */}
           
          {weather=='Sunny'?(<GoSun style={{alignContent:"center",fontSize:"100px",color:"white"}} className='mx-auto mt-3'/>):null}
          {weather=='Mist'?(<RiMistFill style={{alignContent:"center",fontSize:"100px",color:"white"}} className='mx-auto mt-3'/>):null}
          {weather=='Rain'?(<FaCloudRain style={{alignContent:"center",fontSize:"100px",color:"white"}} className='mx-auto mt-3'/>):null}
          {weather=='Clouds'?(<LiaCloudSolid style={{alignContent:"center",fontSize:"100px",color:"white"}} className='mx-auto mt-3'/>):null}
          {weather=='Haze'?(<BsCloudHaze2 style={{alignContent:"center",fontSize:"100px",color:"white"}} className='mx-auto mt-3'/>):null}
            
  
          {weather}

    </div>
    <hr className='w-[75%] mx-auto mt-3 border-[2px]' >
    </hr >
    <div className='flex justify-center mt-3'>
        {/* for searching */}
        <div className='flex'>

        <input id='input' ref={city} placeholder='Search for City' type="text"  className='outline-none p-2 w-full max-w-[200px] sm:max-w-[150px] md:max-w-[140px] flex-grow text-white font-serif font-semibold'  />
        <button onClick={handleClick}>

        <IoSearchCircle style={{fontSize:"50px"}} className='ml-2'/>
        </button>
        </div>
        
    </div>
    <div><hr className='border-[1px] w-[40%] mx-[20%]'></hr></div>
    <div className='p-5 text-white font-bold '>
        {/* for data */}
        <p className='text-center'>{lodash.capitalize(city.current.value)} IN</p>
        <hr />
        <p className='m-1.5 flex justify-between'><span>Temperature</span> <span>{temp}°C</span></p>
        <hr />
        <p className='m-1.5 flex justify-between'><span>Humidity</span> <span>{humid} %</span></p>
        <hr />
        <p className='m-1.5 flex justify-between'><span>Visibility</span> <span>{visibile}m</span></p>
        <hr />
        <p className='m-1.5 flex justify-between'><span>Wind speed</span> <span>{wind} m/s</span></p>
    </div>
    </div>
  )
}

export default Right_m