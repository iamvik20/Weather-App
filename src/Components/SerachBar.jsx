// import React from 'react'

// import HomePage from "../Pages/HomePage"

function SerachBar({handleLocationChange, handleWeatherFetch, location}) {
    return (
        <div className="input-container">
            <input
                type="text"
                placeholder="Enter city or ZIP code"
                value={location}
                onChange={handleLocationChange}
            />
            <i onClick={handleWeatherFetch} className="icon-search fa-solid fa-magnifying-glass"></i>
        </div>
    )
}

export default SerachBar