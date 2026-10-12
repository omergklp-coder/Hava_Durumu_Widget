import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Hava durumu bilgisi alınıyor...</p>
    </div>
  )
}

export default LoadingSpinner

