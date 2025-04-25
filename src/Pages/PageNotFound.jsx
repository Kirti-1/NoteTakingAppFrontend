import './../Styles/NotFoundPage.css'; // Import the custom CSS

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you are looking for does not exist.</p>
        <a href="/" className="home-link"><i className="fas fa-home"></i> Go back to Home</a>
      </div>
    </div>
  );
}

export default NotFoundPage;
