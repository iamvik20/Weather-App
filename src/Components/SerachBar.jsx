/* eslint-disable react/prop-types */
// import React from 'react'

// import HomePage from "../Pages/HomePage"

function SerachBar({ handleLocationChange, handleWeatherFetch, location, errors, onKeyPress }) {
    return (
        <>
            <div className={`input-container ${errors && "error-border"}`}>
                <input
                    type="text"
                    placeholder="Enter city or ZIP code"
                    value={location}
                    onChange={handleLocationChange}
                    onKeyDown={onKeyPress}
                />
                <i onClick={handleWeatherFetch} className="icon-search fa-solid fa-magnifying-glass"></i>
            </div>
            {
                errors && <p className="error">{errors.message}</p>
            }
        </>
    )
}

export default SerachBar