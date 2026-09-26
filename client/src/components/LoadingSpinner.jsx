import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Generating product details...</p>
    </div>
  );
}

export default LoadingSpinner;
