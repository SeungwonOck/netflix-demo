import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'

// 1. Banner
// 2. Popular Movie
// 3. Top rated movie
// 4. Upcoming Movie

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <UpcomingMovieSlide />
    </div>
  )
}

export default Homepage
