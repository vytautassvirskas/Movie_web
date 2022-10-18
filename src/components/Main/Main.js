import Axios from 'axios';
import React, {useEffect, useState} from 'react'

import MovieCard from '../MovieCard/MovieCard';

import "./Main.css"

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;

  
  useEffect(() => {
        Axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY+"&language=en-US")

        // zanrai
        // Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US")

        // trailer
        // Axios.get("https://api.themoviedb.org/3/movie/550/videos?api_key="+API_KEY+"&language=en-US")
        .then((resp)=>{
            console.log(resp);
            setPopularMovies(resp.data.results);
        })
        .catch((err)=>{
            console.log(err);
        })
  
  },[API_KEY])

  return (
    <>
    <main className='main'>
      <h2 className='main__main-heading'>Popular Movies</h2>
      <div className='main__movies-container'>
        {popularMovies.map((movie)=>
          <MovieCard key={movie.id} movie={movie}/>)
        }
      </div>

    </main>
    </>
  )
}

export default Main