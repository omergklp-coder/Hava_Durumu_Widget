
# 🌤️ Hava Durumu Uygulaması

Modern ve güvenli bir Full-Stack JavaScript hava durumu uygulaması. Kullanıcının anlık konumuna göre OpenWeatherMap API'sinden veri çekerek dinamik ve görsel açıdan çekici bir arayüzde hava durumunu gösterir.

## 🛠️ Teknoloji Stack

- **Backend**: Node.js (Express)
- **Frontend**: React (Vite)
- **API İsteği**: Axios
- **API**: OpenWeatherMap

## 📁 Proje Yapısı

```
webhavavidget/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (oluşturulacak)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherCard.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🚀 Kurulum ve Çalıştırma

### 1. API Key Alma

1. [OpenWeatherMap](https://openweathermap.org/api) sitesine gidin
2. Ücretsiz hesap oluşturun
3. API Key'inizi alın

### 2. Backend Kurulumu

```bash
# Backend klasörüne gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# .env dosyası oluşturun
# Windows PowerShell:
New-Item -Path .env -ItemType File

# .env dosyasına API Key'inizi ekleyin:
# OPENWEATHER_API_KEY=your_api_key_here

# Backend'i başlatın
npm start
```

Backend `http://localhost:5000` adresinde çalışacaktır.

### 3. Frontend Kurulumu

Yeni bir terminal penceresi açın:

```bash
# Frontend klasörüne gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Frontend'i başlatın
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışacaktır.

## 📝 Özellikler

### Backend Özellikleri

- ✅ API Key güvenliği (Backend'de saklanır, Frontend'de görünmez)
- ✅ `/api/weather` endpoint'i (lat, lon parametreleri)
- ✅ Hata yönetimi (API Key hatası, bağlantı hatası)
- ✅ Akıllı uyarı/öneri sistemi:
  - Sıcaklık bazlı uyarılar (buzlanma, sıcak hava)
  - Rüzgar hızı uyarıları
  - Hava durumu açıklaması bazlı uyarılar (yağmur, kar, fırtına, sis)

### Frontend Özellikleri

- ✅ Modern, mobil uyumlu tasarım
- ✅ Geolocation API ile otomatik konum alma
- ✅ Durum yönetimi (Yükleniyor, Hata, Başarılı)
- ✅ Uyarı mesajlarının göz alıcı gösterimi
- ✅ Responsive tasarım

## 🔐 Güvenlik

- API Key asla Frontend'de görünmez
- API Key `.env` dosyasında saklanır
- `.env` dosyası `.gitignore` ile korunur

## 📱 Kullanım

1. Uygulamayı açtığınızda tarayıcı konum izni isteyecektir
2. İzin verildikten sonra hava durumu bilgileri otomatik olarak yüklenecektir
3. Uyarılar (varsa) kırmızı bir banner'da gösterilecektir

## 🐛 Sorun Giderme

### Backend bağlantı hatası
- Backend'in `http://localhost:5000` adresinde çalıştığından emin olun
- `.env` dosyasında API Key'in doğru olduğunu kontrol edin

### Konum izni hatası
- Tarayıcı ayarlarından konum iznini açın
- HTTPS veya localhost üzerinden çalıştığınızdan emin olun

### API Key hatası
- OpenWeatherMap'te API Key'inizin aktif olduğunu kontrol edin
- `.env` dosyasındaki API Key'in doğru formatta olduğunu kontrol edin

## 📄 Lisans

ISC

