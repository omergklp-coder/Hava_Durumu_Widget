import './WeatherCard.css'

function WeatherCard({ data }) {
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const formatWindDirection = (degrees) => {
    const directions = ['K', 'K-KD', 'KD', 'D-KD', 'D', 'D-GD', 'GD', 'G-GD', 'G', 'G-GB', 'GB', 'K-GB', 'K']
    return directions[Math.round(degrees / 22.5) % 16]
  }

  return (
    <div className="weather-card">
      {data.alert && (
        <div className="alert-banner">
          <span className="alert-icon">⚠️</span>
          <span className="alert-text">{data.alert}</span>
        </div>
      )}
      
      <div className="card-header">
        <h1 className="city-name">{data.city}</h1>
        <p className="country">{data.country}</p>
      </div>

      <div className="card-body">
        <div className="main-weather">
          <div className="temperature-section">
            <img 
              src={getWeatherIcon(data.icon)} 
              alt={data.description}
              className="weather-icon"
            />
            <div className="temp-info">
              <span className="temperature">{data.temp}°C</span>
              <span className="feels-like">Hissedilen: {data.feelsLike}°C</span>
            </div>
          </div>
          <p className="description">{data.description}</p>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Nem</span>
            <span className="detail-value">{data.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Rüzgar</span>
            <span className="detail-value">
              {data.windSpeed} km/h {formatWindDirection(data.windDirection)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Basınç</span>
            <span className="detail-value">{data.pressure} hPa</span>
          </div>
          {data.visibility && (
            <div className="detail-item">
              <span className="detail-label">Görüş</span>
              <span className="detail-value">{data.visibility} km</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

