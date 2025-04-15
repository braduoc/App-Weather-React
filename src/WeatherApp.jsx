import { useState } from 'react';
import './styles/WeatherStyle.css'

export const WeatherApp = () => {
const UrlBase = 'https://api.openweathermap.org/data/2.5/weather';
const APIKEY = '5c5a8258e2752324de935e16644dad84';

const [city,setCity] = useState('');
const [dataWeather,setDataWeather] = useState(null);
const [error, setError] = useState('');


const HandleChangeCity = (e) => {
    setCity(e.target.value);
}
const HandleSubmit = (e) => {
    e.preventDefault();
    if(city.length > 0) fetchWeather()
}
const fetchWeather = async () => {
    try {
      const response = await fetch(`${UrlBase}?q=${city}&appid=${APIKEY}&units=metric&lang=en`);
      const data = await response.json();
  
      if (data.cod === 200) {
        setDataWeather(data);
        setError(''); // limpia el error si todo está OK
      } else {
        setDataWeather(null); // limpia los datos previos
        setError(data.message); // muestra el mensaje de error
      }
  
    } catch (err) {
      console.error("Ocurrió un error:", err);
      setError('Ocurrió un problema al obtener el clima.');
      setDataWeather(null);
    }
  }
  
  return (
    <>
      <div className= "container">
      <h1>Weather App</h1>
        <form onSubmit={HandleSubmit} >
            <input 
            type="text" 
            value= {city}
            onChange={HandleChangeCity}
            />
            <button type="submit">Search</button>
        </form>
        
           {dataWeather && dataWeather.main && (
            <div className="result">
              <h1> {dataWeather.name}</h1>
              <p> description: {dataWeather.weather[0].description}</p>
              <p>🌡️ Temperature: {dataWeather.main.temp}°C</p>
              <p>💧 Humidity: {dataWeather.main.humidity}%</p>
              <p>🌬️ Wind: {dataWeather.wind.speed} m/s</p>
              <img 
                src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`} />
            </div>
          )}
            {error && <p className="error">{error}</p>}

      </div>

    </>
  );
}

