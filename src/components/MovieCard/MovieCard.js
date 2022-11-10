import React,{useContext} from 'react'

import MainContext from '../../context/MainContext';

import "./MovieCard.css";
import CinemaImg from "../../assets/cinema.jpg"

const MovieCard = (props) => {
const {movie} = props;
const {getTrailer,setIsOpened,setModalData} = useContext(MainContext);
  return (
    <div 
    className='main__card-wrapper' 
    onClick={()=>{
      setModalData(movie)
      setIsOpened(true)
      getTrailer(movie.id)
      }}>
        <div className='main__card'>
            <img 
            className='main__movie-poster' 
            src={movie.backdrop_path ? "https://image.tmdb.org/t/p/w300"+movie.backdrop_path : CinemaImg} 
            alt="movie-poster" />
            {!movie.backdrop_path &&
             <p className='main_movie-missing'>NO MOVIE POSTER</p>
             }
            <p className='main__movie-title'>{movie.title}</p>
            <p className='main__movie-rating'>{movie.vote_average.toFixed(1)}</p>
        </div>
        <div className='main__card'>
            <img 
            className='main__movie-poster' 
            src={movie.backdrop_path ? "https://image.tmdb.org/t/p/w300"+movie.backdrop_path : CinemaImg} 
            alt="movie-poster" />
            <p className='main__movie-title'>{movie.title}</p>
        </div>

    </div>
  )
}

export default MovieCard