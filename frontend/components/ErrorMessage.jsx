import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Hata Oluştu</h2>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            Tekrar Dene
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage

