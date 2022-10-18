import Axios from 'axios';
import React, {useEffect, useState} from 'react'
import Pagination from '@mui/material/Pagination';

import MovieCard from '../MovieCard/MovieCard';

import "./Main.css"

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;


  useEffect(() => {
        Axios.get("https://api.themoviedb.org/3/movie/popular?api_key="
        +
        API_KEY
        +
        "&language=en-US"
        +
        "&page="
        +
        currentPage)

        // zanrai
        // Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US")

        // trailer
        // Axios.get("https://api.themoviedb.org/3/movie/550/videos?api_key="+API_KEY+"&language=en-US")
        .then((resp)=>{
            console.log(resp);
            setMovies(resp.data.results);
            setTotalPages(resp.data.total_pages);
            setCurrentPage(resp.data.page);
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log('ussefect called')
  
  },[API_KEY, currentPage])

  return (
    <>
    <main className='main'>
      <h2 className='main__main-heading'>Popular Movies</h2>
      <div className='main__movies-container'>
        {movies.map((movie)=>
          <MovieCard key={movie.id} movie={movie}/>)
        }
      </div>
      <div className='main__pagination-container'>
        <Pagination 
          count={totalPages} 
          page={currentPage}
          color="primary" 
          defaultPage={1}
          onChange={(e, page)=>{
            setCurrentPage(page);
            console.log(page);
          }}
          />
      </div>
    </main>
    </>
  )
}

export default Main