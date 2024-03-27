import { useState, useEffect } from 'react'
import axios, {isCancel, AxiosError} from 'axios';
import './App.css'

function App() {

  const [city, setCity] = useState('')
  const [cityData, setCityData] = useState('')
  const [search, setSearch] = useState('london')
  const [error, setError] = useState(false)

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let day = weekday[d.getDay()];
  let date = d.getDate()
  let month = months[d.getMonth()]

  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${search}&aqi=no`)
    .then(function (response) {
      // handle success
      setCityData(response.data);
      setError(false)
    })
    .catch(function (error) {
      // handle error
      setError(true);
    })
  }, [search])

  function handleSubmit(event) {
    event.preventDefault();
    setSearch(city)
  }

  return (
    <>
      <h1 className='text-center font-bold text-4xl p-2 mt-20'>Weather App</h1>
      <div className='flex flex-col justify-center items-center p-4'>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type='text'
              placeholder='Enter a city name...'
              className='p-2 rounded-lg bg-blue-100 text-black text-xl border-gray-500'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
        </form> 
           {cityData &&
          <div className='flex flex-col justify-center items-center p-4'>
            {error && <h1>Wrong city name</h1>}
            <h2 className='text-4xl p-2'>{cityData.location.name}, {cityData.location.country}</h2>
            <h3 className='text-xl p-2' >{day} {date} {month}</h3>
            <p className='flex flex-row p-2'>
              <img className='w-32 p-2' src={cityData.current.condition.icon} alt='weather-icon'/>
              <strong className='text-4xl mt-12'>
                {cityData.current.temp_c}
                °C
                </strong>
            </p>
            <p className='text-xl p-2'>{cityData.current.condition.text}</p>
            <p>Wind Speed: {(cityData.current.wind_kph * 0.277778).toFixed(2)} m/s</p>
          </div>
           } 
      </div>
    </>
  )
}

export default App
