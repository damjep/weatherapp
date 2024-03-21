import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./menu.css"

const Menu = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [elevation, setElevation] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false); // State to control the visibility of the search popup

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      const apiKey = '1a945b25256fccab584f58958074cda8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      // Fetch elevation data using geolocation coordinates
      fetchElevation(latitude, longitude);
      // Add the searched city to the list of selected areas
      setSelectedAreas([...selectedAreas, response.data]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const apiKey = '1a945b25256fccab584f58958074cda8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      // Fetch elevation data using geolocation coordinates
      fetchElevation(response.data.coord.lat, response.data.coord.lon);
      // Close the search popup
      setShowSearchPopup(false);
      // Add the searched city to the list of selected areas
      setSelectedAreas([...selectedAreas, response.data]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchElevation = async (latitude, longitude) => {
    try {
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`
      );

      // Extract elevation data from the response
      const elevationResult = response.data.results[0];
      const elevationValue = elevationResult ? elevationResult.elevation : null;

      setElevation(elevationValue);
    } catch (error) {
      console.error('Error fetching elevation data:', error);
    }
  };

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Fetch weather data using user's geolocation coordinates
          fetchWeatherByCoords(latitude, longitude);
        },
        function (error) {
          // Handle errors in getting the user's location
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchWeatherByCity(searchQuery);
    }
  };

  const handleAddArea = () => {
    // Show the search popup when the plus icon is clicked
    setShowSearchPopup(true);
  };

  const handleAreaSelection = (index) => {
    // Set the selected area as the default location
    setWeatherData(selectedAreas[index]);
  };

  const handleAreaDeletion = (index) => {
    // Remove the selected area from the list
    const newSelectedAreas = [...selectedAreas];
    newSelectedAreas.splice(index, 1);
    setSelectedAreas(newSelectedAreas);
  };

  const handlePopupClose = () => {
    // Close the search popup
    setShowSearchPopup(false);
  };

  return (
    <div>
      {weatherData ? (
        <>
          <div className="header">
            <div
              className={`menu-bnt ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="menu-line l1"></div>
              <div className="menu-line l2"></div>
              <div className="menu-line l3"></div>
            </div>
            <h2 className="location">{weatherData.name}</h2>
          </div>
          <div className="menu" style={{ display: isMenuOpen ? 'block' : 'none' }} id="menu">
            <div className="card-holder">
              <div className="loca-card">
                <div className="loca-info">
                  <p>{weatherData.name}</p>
                  <p>{weatherData.weather[0].description}</p>
                </div>
                <p>{weatherData.main.temp}°C</p>
              </div>
              <div className="added-cards">
                {selectedAreas.map((area, index) => (
                  <div key={index} className="loca-card" onClick={() => handleAreaSelection(index)}>
                    <div className="loca-info">
                      <p>{area.name}</p>
                      <p>{area.weather[0].description}</p>
                    </div>
                    <p>{area.main.temp}°C</p>
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
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Menu;

