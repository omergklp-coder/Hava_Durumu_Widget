import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

const API_URL = 'http://localhost:5000/api/weather'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Geolocation API ile konum al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          await fetchWeatherData(latitude, longitude)
        },
        (err) => {
          setError('Konum izni verilmedi veya konum alınamadı. Lütfen tarayıcı ayarlarınızdan konum iznini açın.')
          setLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    } else {
      setError('Tarayıcınız geolocation API\'sini desteklemiyor.')
      setLoading(false)
    }
  }, [])

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(API_URL, {
        params: { lat, lon }
      })

      if (response.data.success) {
        setWeatherData(response.data)
      } else {
        setError(response.data.error || 'Veri alınamadı.')
      }
    } catch (err) {
      if (err.response) {
        // Backend'den gelen hata
        setError(err.response.data.error || 'Bir hata oluştu.')
      } else if (err.request) {
        // İstek gönderilemedi
        setError('Backend sunucusuna bağlanılamadı. Lütfen backend\'in çalıştığından emin olun.')
      } else {
        setError('Beklenmeyen bir hata oluştu.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          await fetchWeatherData(latitude, longitude)
        },
        (err) => {
          setError('Konum izni verilmedi veya konum alınamadı.')
        }
      )
    }
  }

  return (
    <div className="app">
      {loading && <LoadingSpinner />}
      {error && !loading && <ErrorMessage message={error} onRetry={handleRetry} />}
      {weatherData && !loading && !error && <WeatherCard data={weatherData} />}
    </div>
  )
}

export default App

