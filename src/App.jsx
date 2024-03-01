import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Footer from './componets/Footer'


function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }

    };
    if (location) {
      fetchData();
    }
  }, [location])

  const handeLocationChange = (event) => {
    setLocation(event.target.value)
  }




  return (
    <>
      <div className='app-container'>
        <h1 style={{ color: '#fff' }}
          className='app-title'> WEATHER APP</h1>
        <div className='input-container'>
          <input
            style={{ background: '#fff' }}
            className='location-input'
            type='text'
            placeholder='Şehir giriniz'
            value={location}
            onChange={handeLocationChange}
          />
        </div>

      </div>

      {weatherData && (
        <div className='weather-container'>

          {weatherData.forecast.forecastday.map((day) => (
            <div
              style={{ background: '#fff' }}
              className='day-container' key={day.date}>
              <h2
                style={{ background: '#fff' }}
                className='date'> {day.date} </h2>
              <img
                style={{ background: '#fff' }}
                className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text} />
              <p
                style={{ background: '#fff' }}
                className='temperature'> {day.day.avgtemp_c} C</p>
              <p
                style={{ background: '#fff' }}
                className='temperature'> {day.day.condition.text}</p>
            </div>

          ))}


        </div>


      )}
      <Footer />
    </>
  )
}

export default App