import { useEffect, useState } from "react";
import "./App.css";
function Weather({temp , city,place,lat,log,humidity,speed}) {
 
  return (
    <>
      <i className="fa-solid fa-cloud"></i>
      <h1>{Math.round(temp)}<sup>o</sup>C</h1>
      <h1 className="city">{city} </h1>
      <h3>{place}</h3>
      <div className="location">
        <h3>Lattitude <br /><span>{lat}</span></h3>
        <h3>Longitude <br /><span>{log}</span></h3>
      </div>
      <div className="data_container">

        <div className="element">
          <i className="fa-solid fa-water"></i>
          <div className="data">
            <h4>{humidity}%</h4>
            <h5>HUMIDITY</h5>
          </div>
        </div>
        <div className="element">
          <i className="fa-solid fa-wind" ></i>
          <div className="data">
            <h4>{speed}km/h</h4>
            <h5>WIND SPEED</h5>
          </div>
        </div>
      
      </div>
    </>
  );
}
function App() {
  const [Text,setText]=useState('')
  const [temp,setTemp]=useState('')
  const [city,setCity]=useState('')
  const [place,setTPlcae]=useState('')
  const [log,setLog]=useState('')
  const [lat,setLat]=useState('')
  const [humidity,setHumidity]=useState('')
  const [speed,setSpeed]=useState('')
  const [flat,setflat]=useState('')
  const APIkey='d4a4ece67aa095bda0a2b3d28d63f93b'


  function gotlocation(position){
  const flat =(position.coords.latitude)
  const flog=position.coords.longitude
  
  start(flat,flog)
  // search()
  
}

// console.log(lat)


function failedlocation(){
  console.log("hello")
}
  const loc= async ()=>{
    
    fetch(navigator.geolocation.getCurrentPosition(gotlocation,failedlocation))
    
  }
    const start= async (flat,flog)=>{
      
        
   
      
        // console.log(position.coords.latitude)
        const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${flat}&lon=${flog}&appid=${APIkey}&units=metric`)
        const data= await res.json()
        console.log(data)
        setTemp(data.main.temp)
        setCity(data.name)
        setTPlcae(data.sys.country)
        setLog(data.coord.lon)
        setLat(data.coord.lat)
        setHumidity(data.main.humidity)
        setSpeed(data.wind.speed)
     
    }
 

  const search =async () =>{
    try  {
      const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Text ? Text : 'chennai'}&appid=${APIkey}&units=metric`)
      const data= await res.json()
      // console.log(data)
      setTemp(data.main.temp)
      setCity(data.name)
      setTPlcae(data.sys.country)
      setLog(data.coord.lon)
      setLat(data.coord.lat)
      setHumidity(data.main.humidity)
      setSpeed(data.wind.speed)
    } catch (error) {
      
    }

  }
  
  function HandleClick(){
    search()
  }
  const HandleKeyDown = (e)=>{
    if(e.key=='Enter'){
      search()
    }
  }
  useEffect(() => {
    // Your effect logic here
    
    // setText('chennai')
    
    loc()
  }, []);

  return (
    <>
      <div className="container">
        <div className="input_section">
          <input type="text" className="search_bar" placeholder="SEARCH" value={Text} onChange={(e)=>{setText(e.target.value)}} onKeyDown={HandleKeyDown} />
          <i onClick={HandleClick}  className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="weather_section">
          <Weather  temp={temp} city={city} place={place} lat={lat} log={log} humidity={humidity} speed={speed} />
        </div>
      </div>
    </>
  );
}

export default App;
