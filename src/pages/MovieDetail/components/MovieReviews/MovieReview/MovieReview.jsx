import React, { useState } from 'react'
import "./MovieReview.style.css"

const MovieReview = ({author, content}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="review-container">
      <div className="author">{author}</div>
      <div className={`content ${isOpen ? "expanded" : "collapsed"}`}>
        {content}
      </div>
      {content.length > 100 && (
        <button className="toggle-button" onClick={handleToggle}>
          {isOpen ? "Close" : "More"}
        </button>
      )}
    </div>
  )
}

export default MovieReview
