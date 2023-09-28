/* eslint-disable react/prop-types */
// import React from 'react';

import { useState } from "react";
import './WeatherDisplay.css'

function WeatherDisplay({ data }) {
    const [unit, setUnit] = useState('C');

    const toggleUnit = () => {
        // Toggle between Celsius (C) and Fahrenheit (F)
        setUnit(unit === 'C' ? 'F' : 'C');
    };

    const tempConverter = (temperature) => {
        let final = temperature * (9 / 5) + 32;
        return final.toFixed(2);
    }
    const { name, country, temperature, feelLike, maxTemp, minTemp, humidity, windSpeed, weatherDescription, icon } = data;
    const temp = unit === 'C' ? temperature : tempConverter(temperature)
    return (
        <section className="weather-container">
            <h1>Current Weather in {name} , {country} </h1>
            <div className="weather-display">
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather-icon" />
                <div className="weather-details">
                    <p>Temperature: {temp}
                        <span className="convert-button">
                            <button onClick={toggleUnit}>
                                °{unit === 'C' ? 'C' : 'F'}
                            </button>
                        </span>
                    </p>
                    <p>Feels Like: {feelLike}°C</p>
                    <p>Maximum Temperature: {maxTemp}°C</p>
                    <p>Minimum Temperature: {minTemp}°C</p>
                    <p>Humidity: {humidity}%</p>
                    <p>Wind Speed: {windSpeed} km/h</p>
                    <p>Weather: {weatherDescription}</p>
                </div>
            </div>
        </section>

    );
}

export default WeatherDisplay;
