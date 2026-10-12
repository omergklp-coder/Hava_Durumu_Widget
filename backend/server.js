import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Uyarı/Öneri mantığı fonksiyonu
function generateAlert(weatherData) {
  const { temp, windSpeed, description } = weatherData;
  const alerts = [];

  // Sıcaklık kontrolü
  if (temp < 5) {
    alerts.push("Dikkat! Buzlanma Riski Var. Eldiven Takın.");
  } else if (temp < 10) {
    alerts.push("Soğuk hava! Kalın giysiler giymeyi unutmayın.");
  } else if (temp > 30) {
    alerts.push("Sıcak hava! Bol su içmeyi ve güneşten korunmayı unutmayın.");
  }

  // Rüzgar hızı kontrolü
  if (windSpeed > 15) {
    alerts.push("Güçlü rüzgar uyarısı! Dikkatli olun.");
  } else if (windSpeed > 25) {
    alerts.push("Çok güçlü rüzgar! Mümkünse dışarı çıkmayın.");
  }

  // Hava durumu açıklaması kontrolü
  const desc = description.toLowerCase();
  if (desc.includes('rain') || desc.includes('drizzle')) {
    alerts.push("Yağmur var! Şemsiye almayı unutmayın.");
  } else if (desc.includes('snow')) {
    alerts.push("Kar yağıyor! Yollar kaygan olabilir, dikkatli olun.");
  } else if (desc.includes('storm') || desc.includes('thunder')) {
    alerts.push("Fırtına uyarısı! Güvenli bir yerde kalın.");
  } else if (desc.includes('fog') || desc.includes('mist')) {
    alerts.push("Sis var! Görüş mesafesi düşük, dikkatli sürün.");
  }

  return alerts.length > 0 ? alerts.join(' ') : null;
}

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // Parametre kontrolü
    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Latitude ve longitude parametreleri gerekli.',
        success: false
      });
    }

    // API Key kontrolü
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'API Key bulunamadı. Lütfen .env dosyasını kontrol edin.',
        success: false
      });
    }

    // OpenWeatherMap API isteği
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;
    
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Veriyi işle ve uyarı ekle
    const weatherData = {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s'den km/h'ye çevir
      windDirection: data.wind.deg || 0,
      description: data.weather[0].description,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      city: data.name,
      country: data.sys.country,
      visibility: data.visibility ? (data.visibility / 1000).toFixed(1) : null,
      success: true
    };

    // Uyarı/öneri ekle
    const alert = generateAlert({
      temp: weatherData.temp,
      windSpeed: weatherData.windSpeed,
      description: weatherData.description
    });

    if (alert) {
      weatherData.alert = alert;
    }

    res.json(weatherData);

  } catch (error) {
    console.error('API Hatası:', error.message);
    
    // Hata türüne göre mesaj
    if (error.response) {
      // API'den gelen hata
      if (error.response.status === 401) {
        return res.status(401).json({
          error: 'Geçersiz API Key. Lütfen .env dosyasındaki API Key\'i kontrol edin.',
          success: false
        });
      } else if (error.response.status === 404) {
        return res.status(404).json({
          error: 'Konum bulunamadı.',
          success: false
        });
      } else {
        return res.status(error.response.status).json({
          error: error.response.data.message || 'API hatası oluştu.',
          success: false
        });
      }
    } else if (error.request) {
      // İstek gönderilemedi
      return res.status(503).json({
        error: 'OpenWeatherMap API\'sine bağlanılamadı. İnternet bağlantınızı kontrol edin.',
        success: false
      });
    } else {
      // Diğer hatalar
      return res.status(500).json({
        error: 'Sunucu hatası oluştu.',
        success: false
      });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server ${PORT} portunda çalışıyor`);
  console.log(`📍 Weather API: http://localhost:${PORT}/api/weather`);
});

