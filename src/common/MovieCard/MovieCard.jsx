import React from 'react'
import { Badge } from 'react-bootstrap'
import "./MovieCard.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  
  const { data: genreData } = useMovieGenreQuery();
  
  const showGenre = (genreIdList) => {
    if (!genreData) return []
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name;
    })

    return genreNameList;
  }

  const goToMovieDetailPage = (id) => {
    navigate(`/movies/${id}`)
  }

  return (
    <div
      style={{ backgroundImage: "url(" + `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` + ")" }}
      className="movie-card"
      onClick={() => goToMovieDetailPage(movie.id)}
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        <div className="badge-container">
        {showGenre(movie.genre_ids).map((id) => (<Badge bg="danger">{id}</Badge>
        ))}
        </div>
        <div className="info-container">
          <div>Vote Average: {movie.vote_average}</div>
          <div>Popularity: {movie.popularity}</div>
          <div>{movie.adult ? "over18":"under18"}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;
