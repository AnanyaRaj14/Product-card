import './ErrorMessage.css';

function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message" role="alert">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
    </div>
  );
}

export default ErrorMessage;
