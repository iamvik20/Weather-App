import React, { useState, useEffect } from "react";
import './WeatherDisplay.css';

function WeatherDisplay({ data }) {
    const [unit, setUnit] = useState('C');
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleUnit = () => {
        setUnit(unit === 'C' ? 'F' : 'C');
    };

    const tempConverter = (temperature) => {
        return ((temperature * 9 / 5) + 32).toFixed(1);
    };

    const fetchForecast = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
            }
            const forecastData = await response.json();

            // Filter to get one forecast per day (e.g., at noon)
            const dailyForecast = forecastData.list.filter((item) =>
                item.dt_txt.includes("12:00:00")
            );

            setForecast(dailyForecast);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching forecast:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data.name) {
            fetchForecast();
        }
    }, [data.name]);

    const { name, country, temperature, feelLike, maxTemp, minTemp, humidity, windSpeed, weatherDescription, icon } = data;
    const temp = unit === 'C' ? temperature : tempConverter(temperature);

    return (
        <section className="weather-container">
            <h1>Current Weather in {name}, {country}</h1>
            <div className="weather-display">
                <img src={`https://openweathermap.org/img/w/${icon}.png`} alt="weather-icon" />
                <div className="weather-details">
                    <p>Temperature: {temp}°{unit}
                        <span className="convert-button">
                            <button onClick={toggleUnit}>
                                °{unit === 'C' ? 'C' : 'F'}
                            </button>
                        </span>
                    </p>
                    <p>Feels Like: {unit === 'C' ? feelLike : tempConverter(feelLike)}°{unit}</p>
                    <p>Maximum Temperature: {unit === 'C' ? maxTemp : tempConverter(maxTemp)}°{unit}</p>
                    <p>Minimum Temperature: {unit === 'C' ? minTemp : tempConverter(minTemp)}°{unit}</p>
                    <p>Humidity: {humidity}%</p>
                    <p>Wind Speed: {windSpeed} km/h</p>
                    <p>Weather: {weatherDescription}</p>
                </div>
            </div>

            {/* 5-Day Forecast Section */}
            <div className="forecast-section">
                <h2>5-Day Forecast</h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <div className="forecast-grid">
                    {forecast.map((day) => (
                        <div key={day.dt} className="forecast-day">
                            <p>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                            <img
                                src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                                alt={day.weather[0].description}
                            />
                            <p>{unit === 'C' ? day.main.temp.toFixed(1) : tempConverter(day.main.temp)}°{unit}</p>
                            <p>{day.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WeatherDisplay;