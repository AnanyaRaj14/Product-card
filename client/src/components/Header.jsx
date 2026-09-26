import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">
            <span className="icon">✨</span>
            AI Product Card Generator
          </h1>
          <p className="header-subtitle">
            Generate professional product content with the power of AI
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
