import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon  from '../assets/search.png'
import rain_icon  from '../assets/rain.png'
import clear_icon  from '../assets/clear.png'
import cloud_icon  from '../assets/cloud.png'
import drizzle_icon  from '../assets/drizzle.png'
import snow_icon  from '../assets/snow.png'
import wind_icon  from '../assets/wind.png'
import humidity_icon  from '../assets/humidity.png'

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState({
    humidity: 0,
    windspeed: 0,
    temperature: 0,
    location: "",
    icon: clear_icon
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const allicons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const search = async(city) => {
    // Clear previous error messages
    setErrorMessage("")
    
    if(city === ""){
      setErrorMessage("Please enter a city name")
      return
    }
    
    setLoading(true)
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      
      const response = await fetch(url)
      const data = await response.json()
       
      if(!response.ok){
        setErrorMessage(data.message || "Failed to fetch weather data")
        setLoading(false)
        return
      }

      // Get the weather icon code from the API response
      const iconCode = data.weather[0].icon
      
      // Log the icon code to help with debugging
      console.log("Weather icon code:", iconCode)
      
      // Find the matching icon or use clear_icon as fallback
      const iconToUse = allicons[iconCode] || clear_icon
      
      // Log which icon we're using
      console.log("Using icon:", iconToUse)
      
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: iconToUse
      })
    } catch (error) {
      setErrorMessage("Network error. Please try again later.")
      console.error("Error fetching weather data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    search('london')
  }, [])

  // For debugging: log when weatherData changes
  useEffect(() => {
    console.log("Weather data updated:", weatherData)
  }, [weatherData])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input 
          ref={inputRef} 
          type='text' 
          placeholder='Search city'
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              search(inputRef.current.value)
            }
          }}
        />
        <img 
          src={search_icon} 
          alt='Search' 
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      
      {/* Error message display */}
      {errorMessage && (
        <div className='error-message'>
          {errorMessage}
        </div>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className='loading-message'>
          Loading weather data...
        </div>
      )}
      
      {!errorMessage && !loading && (
        <>
          <img src={weatherData.icon} alt='Weather condition' className='weather_icon'/>
          <p className='temperature'>{weatherData.temperature}°c</p>
          <p className='location'>{weatherData.location}</p>

          <div className='weather_data'>
            <div className='col'>
              <img src={humidity_icon} alt='Humidity'/>
            </div>
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>

            <div className='col'>
              <img src={wind_icon} alt='Wind'/>
            </div>
            <div>
              <p>{weatherData.windspeed} km/h</p>
              <span>Wind speed</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather