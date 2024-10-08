import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom';
import { Alert, Col, Container, DropdownButton, Dropdown,Row } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import "./MoviePage.style.css";
//경로 2가지
//1. Click Navbar => popularMovie 보여주기
//2. Type Keyword => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("Genre");
  const [selectedSort, setSelectedSort] = useState(" More Popular");
  const [pageCount, setPageCount] = useState(0);
  const selectList = ["More Popular", "Less Popular", "Newest", "Oldest"];
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genreData, isLoading: isGenreLoading, isError: isGenreError } = useMovieGenreQuery();
  const totalPages = Math.min(data?.total_pages || 1, 12);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1)
  }

  const sortGenre = (genreId, genreName) => {
    if (genreId === null) {
      setQuery({});
    } else {
      setQuery({ genre: genreId})
    }
    setSelectedGenre(genreName);
    setPage(1);
  }

  const handleSelect = (e) => {
    setSelectedSort(e.target.value);
  }

  useEffect(() => {
    setQuery({});
  }, [])

  useEffect(() => {
    setPage(1);
  }, [keyword])

  const filteredMovies = query.get("genre")
    ? data?.results?.filter(movie => movie.genre_ids.includes(parseInt(query.get("genre"), 10)))
    : data?.results;

  const sortedMovies = filteredMovies?.sort((a, b) => {
    switch (selectedSort) {
      case "More Popular":
        return b.popularity - a.popularity;
      case "Less Popular":
        return a.popularity - b.popularity;
      case "Newest":
        return new Date(b.release_date) - new Date(a.release_date);
      case "Oldest":
        return new Date(a.release_date) - new Date(b.release_date);
      default:
        return 0;
    }
  })

  useEffect(() => {
    if (query.get("genre")) {
      const filteredMovies = data?.results?.filter(movie => movie.genre_ids.includes(parseInt(query.get("genre"), 10)));
      const totalFilteredPages = filteredMovies ? Math.ceil(filteredMovies.length / 20) : 0;
      setPageCount(totalFilteredPages);
    } else {
      setPageCount(totalPages || 0);
    }
  }, [data, query]);

  if (isLoading || isGenreLoading) {
    return <h1>Loading...</h1>
  }

  if (isError || isGenreError) {
    return <Alert variant="danger">{error.message}</Alert>
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <DropdownButton className="custom-dropdown" title={selectedGenre}>
            <Dropdown.Item onClick={() => sortGenre(null, "Genre")}>All</Dropdown.Item>
            {genreData?.map(genre => (
              <Dropdown.Item key={genre.id} onClick={() => sortGenre(genre.id, genre.name)}>
                {genre.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <div className="sort-section">
            <div className="title">Sort</div>
            <select className="custom-select" aria-label="Default select example" onChange={handleSelect} value={selectedSort}>
              {selectList.map((selectItem, index) => (
                <option key={index} value={selectItem}>
                  {selectItem}
                </option>
              ))}
            </select>
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row className="movie-container">
            {sortedMovies.length > 0 ? (
              sortedMovies.map((movie, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                  <MovieCard movie={movie} />
                </Col>
              ))
            ) : (
              <div className="no-results-container">
                <h2 className="no-results-message">Search results not found</h2>
              </div>
            )}
          </Row>
          {sortedMovies.length > 0 && (
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages} // total page
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            )}
        </Col>
      </Row>
    </Container>
  )
}

export default MoviePage
