import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./NotFoundPage.style.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Oops! We can't find the movie you're looking for.</p>
        <p className="not-found-text">It might have been removed, or the URL could be incorrect.</p>
        <button className="home-button" onClick={() => navigate("/")}>Go Back to Home</button>
      </div>
    </div>
  )
}

export default NotFoundPage
