import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, Sun, Moon, CloudRain, CloudLightning, Snowflake, CloudSnow } from 'lucide-react';
import { getWeatherDescription } from '../services/weatherApi';

export const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { location, current, units } = data;
  const description = getWeatherDescription(current.weather_code);
  const isDay = current.is_day === 1;

  const getWeatherIcon = (code, isDay) => {
    if (code === 0 || code === 1) return isDay ? <Sun size={80} color="#fca5a5" /> : <Moon size={80} color="#cbd5e1" />;
    if (code >= 51 && code <= 67) return <CloudRain size={80} color="#93c5fd" />;
    if (code >= 71 && code <= 77) return <Snowflake size={80} color="#e0f2fe" />;
    if (code >= 80 && code <= 82) return <CloudRain size={80} color="#60a5fa" />;
    if (code >= 85 && code <= 86) return <CloudSnow size={80} color="#bae6fd" />;
    if (code >= 95) return <CloudLightning size={80} color="#fde047" />;
    return <Cloud size={80} color="#e2e8f0" />;
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">{location}</h2>
        <p className="weather-desc">{description}</p>
      </div>

      <div className="main-temp-container">
        <div className="main-icon">
          {getWeatherIcon(current.weather_code, isDay)}
        </div>
        <div className="temperature-readout">
          <span className="temperature">{Math.round(current.temperature_2m)}</span>
          <span className="temp-unit">{units.temperature_2m}</span>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon-container">
            <Thermometer size={24} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(current.apparent_temperature)}{units.apparent_temperature}</span>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon-container">
            <Wind size={24} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{Math.round(current.wind_speed_10m)} {units.wind_speed_10m}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon-container">
            <Droplets size={24} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{current.relative_humidity_2m}{units.relative_humidity_2m}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon-container">
            <Cloud size={24} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Precipitation</span>
            <span className="detail-value">{current.precipitation} {units.precipitation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
