import React, { useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { useMovieReviewQuery } from '../../../../hooks/useMovieReview';
import MovieReview from './MovieReview/MovieReview';
import "./MovieReviews.style.css"

const MovieReviews = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieReviewQuery({ id });

  const [showReviews, setShowReviews] = useState(false);

  const handleShowReviews = () => {
    setShowReviews(!showReviews);
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>
  }

  return (
    <div>
      <h1 className="reviewTitle">
        Movie Reviews{" "}
        <button className="reviews" onClick={handleShowReviews}>
          {showReviews ? "Close" : "More"}
        </button>
      </h1>
      <div>
         {showReviews ? (
          data?.results.length > 0 ? (
            <Row>
              {data.results.map((review) => (
                <Col xs={12} sm={6} lg={3} key={review.id}>
                  <MovieReview author={review.author} content={review.content} />
                </Col>
              ))}
            </Row>
          ) : (
            <p>Review does not exist</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default MovieReviews
