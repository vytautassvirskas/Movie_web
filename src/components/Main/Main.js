import Axios from 'axios';
import React, {useEffect, useState, useContext} from 'react'


import MainContext from '../../context/MainContext';
import MovieCard from '../MovieCard/MovieCard';
import Pagination from '../Pagination/Pagination';
import Genres from '../Genres/Genres';


import "./Main.css"

export function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return debounceValue;
}

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const {keyword,selectedGenres,isSearchStarted,currentPage, setCurrentPage} = useContext(MainContext);
  const debounceValue = useDebounce(keyword, 800);
  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;


  //fetch popular movies
  useEffect(() => {
    if (!isSearchStarted) 
   { Axios.get("https://api.themoviedb.org/3/discover/movie?api_key="
    +
    API_KEY
    +
    "&language=en-US&sort_by=popularity.desc&with_genres="
    +
    selectedGenres.join(",")
    +
    "&page="
    +
    currentPage
    )     
        .then((resp)=>{
            console.log("popular movies in main:", resp);
            setMovies(resp.data.results);
            setTotalPages(resp.data.total_pages);
            setCurrentPage(resp.data.page);
        })
        .catch((err)=>{
            console.log(err);
        })}
  },[API_KEY, currentPage, keyword==="", selectedGenres])

  //search

  useEffect(() => {
    if (isSearchStarted) 
    {
      Axios.get("https://api.themoviedb.org/3/search/movie?api_key=" 
      +
      API_KEY
      +
      "&language=en-US"
      +
      "&query="
      +
      keyword
      +
      "&page="
      +
      currentPage)

      .then((resp)=>{
        setMovies(resp.data.results);
        setTotalPages(resp.data.total_pages);
        setCurrentPage(resp.data.page);

      })
      .catch((err)=>{
          console.log(err);
      })
    }
  }, [debounceValue,API_KEY, currentPage]);

  return (
    <>
    
      {
        movies.length>0 ?
        <main className='main'>
          <Genres setCurrentPage={setCurrentPage}></Genres>
          <div className='main__pagination-container'>
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
          <h2 className='main__main-heading'>Popular Movies</h2>
          <div className='main__movies-container'>
            {movies.map((movie)=>
              <MovieCard key={movie.id} movie={movie}/>)
            }
          </div>
          <div className='main__pagination-container'>
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        </main>
        :
        <div className="message">
          {keyword.trim().length===0 
          ? <h2 className='message__text'>server error</h2> //sita kartais rodo uzkraunant page
          : <h2 className='message__text'>Your search for "{keyword}" did not have any matches.</h2>}
        </div>
      }    
    </>
  )
}

export default Main