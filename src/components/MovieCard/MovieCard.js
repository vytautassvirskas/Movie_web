import React from 'react'

import "./MovieCard.css";

const MovieCard = (props) => {
const {movie} = props;
  return (
    <div className='main__card-wrapper'>
        <div className='main__card'>
            <img className='main__movie-poster' src={"https://image.tmdb.org/t/p/w300"+movie.backdrop_path} alt="movie-poster" />
            <p className='main__movie-title'>{movie.title}</p>
            <p className='main__movie-rating'>{movie.vote_average}</p>
        </div>
        <div className='main__card'>
            <img className='main__movie-poster' src={"https://image.tmdb.org/t/p/w300"+movie.backdrop_path} alt="movie-poster" />
            <p className='main__movie-title'>{movie.title}</p>
        </div>

    </div>
  )
}

export default MovieCard