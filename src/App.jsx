import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './Pages/HomePage';


function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    country: '',
    temperature: '',
    feelLike: '',
    maxTemp: '',
    minTemp: '',
    humidity: '',
    windSpeed: '',
    weatherDescription: '',
    icon: '',
  });

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    async function getGeoData() {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          setWeatherData({
            name: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feelLike: data.main.feels_like,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            weatherDescription: data.weather[0].description,
            icon: data.weather[0].icon,
          });
          setErrors(null);
        })
        .catch((error) => {
          setErrors({
            cod: 404,
            message: "City not found"
          })
        });
    }
    getGeoData()

  }, [lat, long]);


  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleWeatherFetch = () => {
    fetchWeatherData(location);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData(location);
    }
  };

  const fetchWeatherData = (location) => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},in&APPID=${import.meta.env.VITE_API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({
          name: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          feelLike: data.main.feels_like,
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          weatherDescription: data.weather[0].description,
          icon: data.weather[0].icon,
        });
        setErrors(null);
      })
      .catch(() => {
        setErrors({
          cod: 404,
          message: "City not found"
        })
      });
  };


  return (
    <div>
      <HomePage
        weatherData={weatherData}
        errors={errors}
        handleLocationChange={handleLocationChange}
        handleWeatherFetch={handleWeatherFetch}
        value={location}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default App;
