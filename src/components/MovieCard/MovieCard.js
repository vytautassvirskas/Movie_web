import React,{useContext} from 'react'

import MainContext from '../../context/MainContext';

import "./MovieCard.css";
import CinemaImg from "../../assets/cinema.jpg"

const MovieCard = (props) => {
const {movie} = props;
const {getTrailer,setIsOpened,setModalData} = useContext(MainContext);
  return (
    <div 
    className='movie-card' 
    onClick={()=>{
      setModalData(movie)
      setIsOpened(true)
      getTrailer(movie.id)
      }}>
        <div className='movie-card__wrapper'>
            <img 
            className='movie-card__poster' 
            src={movie.backdrop_path ? "https://image.tmdb.org/t/p/w780"+movie.backdrop_path : CinemaImg} 
            alt="movie-poster" 
            loading='lazy'
            
            />
            {!movie.backdrop_path &&
             <p className='movie-card__missing'>NO MOVIE POSTER</p>
             }
            <p className='movie-card__title'>{movie.title}</p>
            <p className='movie-card__rating'>{movie.vote_average.toFixed(1)}</p>
            <div className='movie-card__wrapper movie-card__wrapper--rotated'>
              <img 
              className='movie-card__poster' 
              src={movie.backdrop_path ? "https://image.tmdb.org/t/p/w300"+movie.backdrop_path : CinemaImg} 
              alt="movie-poster" />
              <p className='movie-card__title'>{movie.title}</p>
          </div>
        </div>
    </div>
  )
}

export default MovieCard