import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { Alert, Col, Container, Modal, Row } from 'react-bootstrap';
import { useMoviePreviewQuery } from '../../hooks/useMoviePreview';
import MovieRecommendations from './components/MovieRecommendations/MovieRecommendations';
import MovieReviews from './components/MovieReviews/MovieReviews';
import "./MovieDetailPage.style.css"
import YouTube from 'react-youtube';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery({id});
  const { data: previewData } = useMoviePreviewQuery({ id });
  const [openModal, setOpenModal] = useState(false);
  const videoId = previewData?.results?.[0]?.key;
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12}>
          <div className="movie-details">
            <div className="movie-image">
              <img
                src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                alt={data.title}
                className="img-fluid"
                />
                <button className="preview-button" onClick={() => setOpenModal(true)}>
                  Preview
                </button>
            </div>

            <div className="movie-info">
              <h1 className="movie-title">
                {data.title} <small>({data.release_date})</small>
              </h1>

              <div className="movie-genres">
                {data.genres.map((genre, index) => (
                  <span key={index} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="movie-overview">{data.overview}</p>

              <div className="movie-additional-info">
                <p><strong>Runtime:</strong> {data.runtime} minutes</p>
                <p><strong>Vote Average:</strong> {data.vote_average}</p>
                <p><strong>Adult Content:</strong> {data.adult ? 'Yes' : 'No'}</p>
              </div>
            </div>
            </div>
            
            <Modal
            className="custom-modal"
            show={openModal}
            onHide={() => setOpenModal(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
                YouTube Preview
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="youtube-video-wrapper">
                <YouTube videoId={videoId} opts={opts} className="youtube-video" />
              </div>
            </Modal.Body>
          </Modal>
          </Col>
          <Col xs={12}>
            <MovieReviews />
            <MovieRecommendations />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MovieDetailPage
