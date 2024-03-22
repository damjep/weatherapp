import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./menu.css"
import { useSelectedAreas } from './SelectedAreas';
import useWeatherData from '../fetch/useWeatherData';
import { FetchData } from '../fetch/fetchData';

const Menu = () => {
  const { weatherData,setWeatherData } = useWeatherData(); // State to store the weather data
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the visibility of the menu
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const {selectedAreas, setSelectedAreas} = useSelectedAreas(); // State to store the list of selected areas
  const [showSearchPopup, setShowSearchPopup] = useState(false); // State to control the visibility of the search popup
  const [cityData, setCityData] = useState(null);

  const fetchWeatherByCity = async (city) => {
    try {
      const apiKey = 'e75719491e7470f1a5954a20eb6b8c47';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setCityData(response.data);
      // Fetch elevation data using geolocation coordinates
      // Close the search popup
      setShowSearchPopup(false);
      // Add the searched city to the list of selected areas
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  // Inside Menu component
// useEffect hook for weatherData
useEffect(() => {
  if (cityData) {
    async function fetchData() {
      try {
        const data = await FetchData(cityData.coord.lat, cityData.coord.lon);
        setWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  } else {
  }
}, [cityData]);

// useEffect hook for selectedAreas
useEffect(() => {
  if (weatherData) {
    setSelectedAreas([...selectedAreas, weatherData]);
  }
}, [weatherData]);

// Remove weatherData dependency from the second useEffect hook


  // Location card logic 

  // Search logic
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchWeatherByCity(searchQuery);
    }
  };

  // Add area logic
  const handleAddArea = () => {
    // Show the search popup when the plus icon is clicked
    setShowSearchPopup(true);
  };

  // Area selection logic
  const handleAreaSelection = (index) => {
    // Set the selected area as the default location
    setWeatherData(selectedAreas[index]);
  };

  // Area deletion logic
  const handleAreaDeletion = (index) => {
    // Remove the selected area from the list
    const newSelectedAreas = [...selectedAreas];
    newSelectedAreas.splice(index, 1);
    setSelectedAreas(newSelectedAreas);
  };

  // Close the search popup
  const handlePopupClose = () => {
    // Close the search popup
    setShowSearchPopup(false);
  };

  return (
    <div>
      {weatherData ? (
        <>
          <div className="header">
            {/* menu button */}
            <div
              className={`menu-bnt ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              id='menuBtn'
            >
              {/* hamburger menu */}
              <div className="menu-line l1"></div>
              <div className="menu-line l2"></div>
              <div className="menu-line l3"></div>
            </div>
            <h2 className="location">{cityData ? 'Leeds': 'London'}</h2>
          </div>
          {/* 
          menu 
          only shows up when hamburgermenu is pressed 
          closes when menu button is pressed again
          */}
          <div className="menu" style={{ display: isMenuOpen ? 'block' : 'none' }} id="menu">
            <div className="card-holder">
              {/* Current Location Card */}
              <div className="loca-card">
                <div className="loca-info">
                  <p className="loca-name">{}</p>
                  <p>{weatherData.current.weather[0].description}</p>
                  <p>{new Date(weatherData.dt * 1000).toLocaleDateString()} {new Date(weatherData.dt * 1000).toLocaleTimeString()}</p>
                </div>
                <p>{weatherData.current.temp}°C</p>
              </div>
              {/* Added Cards (other location cards which are added by clicking the plus icon) */}
              <div className="added-cards">
                {selectedAreas.map((area, index) => (
                  <div key={index} className="loca-card" onClick={() => handleAreaSelection(index)}>
                    <div className="loca-info">
                      <p className="loca-name">{area.name}</p>
                      <p>{area.current.weather[0].description}</p>
                      <p>{new Date(area.current.dt * 1000).toLocaleDateString()} {new Date(area.current.dt * 1000).toLocaleTimeString()}</p>
                    </div>
                    <p>{area.current.temp}°C</p>
                    <div className="delete-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from bubbling to the card
                      handleAreaDeletion(index);
                    }}>
                      <div className="menu-line l1"></div>
                      <div className="menu-line l2"></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Addes new Cards */}
              <div className="loca-card plus-card" onClick={handleAddArea}>
                <div className="plus"></div>
              </div>
              {/* Search Popup */}
              {showSearchPopup && (
                <div className="search-popup">
                  <div className="search-popup-content">
                    <span className="close" onClick={handlePopupClose}>&times;</span>
                    <input
                      type="text"
                      placeholder="Enter city name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                  </div>
                </div>
              )}
            </div>
            
          </div>
          
        </>
      ) : (
        // Loading message/error message
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Menu;

