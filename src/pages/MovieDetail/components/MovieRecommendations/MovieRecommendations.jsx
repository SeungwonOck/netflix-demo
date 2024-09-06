import React from 'react'
import { useParams } from 'react-router-dom'
import { useMovieRecommendationsQuery } from '../../../../hooks/useMovieRecommendations';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../../../../common/MovieCard/MovieCard';

const MovieRecommendations = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieRecommendationsQuery({ id });

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>
  }

  return (
    <div>
      <span style={{
        fontSize: "30px",
        marginLeft: "10px",
      }}>Recommendations</span>
      <Container style={{paddingRight: "10rem", marginBottom: "20px"}}>
        <Row>
          {data?.results.slice(0, 6).map((movie, index) => (
            <Col key={index} xs={6} sm={2}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default MovieRecommendations
