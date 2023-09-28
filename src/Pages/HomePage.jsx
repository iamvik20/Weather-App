/* eslint-disable react/prop-types */
// import React from 'react'

import SerachBar from "../Components/SerachBar"
import WeatherDisplay from "../Components/WeatherDisplay"

function HomePage({ weatherData, handleLocationChange, handleWeatherFetch, errors, value, onKeyPress }) {
    return (
        <section className="homepage">
            <div className="nav-menu">
                <h1 className="logo">Weather App</h1>
                <SerachBar
                    location={value}
                    handleLocationChange={handleLocationChange}
                    handleWeatherFetch={handleWeatherFetch}
                    onKeyPress={onKeyPress}
                    errors={errors}
                />
            </div>
            {weatherData && <WeatherDisplay data={weatherData} errors={errors} />}
        </section>
    )
}

export default HomePage