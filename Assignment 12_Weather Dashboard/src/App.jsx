import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { fetchWeatherData } from './services/weatherApi';
import { Loader2, AlertCircle } from 'lucide-react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Optionally fetch default city weather on mount
    // handleSearch('London');
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">WeatherCast</h1>
      
      <div className="weather-dashboard">
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner">
              <Loader2 size={48} />
            </div>
            <p>Fetching conditions...</p>
          </div>
        )}

        {!loading && !error && weatherData && (
          <WeatherCard data={weatherData} />
        )}

        {!loading && !error && !weatherData && (
          <div className="loading-container" style={{ opacity: 0.6, padding: '2rem 0' }}>
            <p>Enter a city to get the current weather conditions.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
