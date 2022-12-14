import Axios from 'axios';
import React, {useEffect, useState, useContext} from 'react'


import MainContext from '../../context/MainContext';
import MovieCard from '../MovieCard/MovieCard';
import Pagination from '../Pagination/Pagination';
import Genres from '../Genres/Genres';

import Loader from "../Loader/Loader"

import "./Main.css"

export function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);


    return () => {
      clearTimeout(timeoutId)};
  }, [value,delay]);
  return debounceValue.trim();
}
const Main = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {keyword,selectedGenres,currentPage, setCurrentPage} = useContext(MainContext);
  const debounceKeyword = useDebounce(keyword, 800);
  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
  

  //fetch popular movies
  useEffect(() => {
      if (debounceKeyword.length===0) 
    { 
      setIsLoading(true);
      Axios.get("https://api.themoviedb.org/3/discover/movie?api_key="
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
              // console.log("popular movies in main:", resp);
              setMovies(resp.data.results);
              setTotalPages(resp.data.total_pages);
          })
          .catch((err)=>{
              console.log(err);
          })
          .finally(()=>{
              setIsLoading(false);
          })
      }
  },[API_KEY, currentPage, debounceKeyword, selectedGenres])


  //search

  useEffect(() => {
    if (debounceKeyword.length>0) 
    {
      setIsLoading(true);
      Axios.get("https://api.themoviedb.org/3/search/movie?api_key=" 
      +
      API_KEY
      +
      "&language=en-US"
      +
      "&query="
      +
      debounceKeyword
      +
      "&page="
      +
      currentPage)

      .then((resp)=>{
        // console.log("search results in main:", resp);
        setMovies(resp.data.results);
        setTotalPages(resp.data.total_pages);
      })
      .catch((err)=>{
          console.log(err);
      })
      .finally(()=>{
          setIsLoading(false);
      })
     

    }
  }, [debounceKeyword,API_KEY, currentPage]);

  if(isLoading) return <Loader/>
  return (
    <>
      {
        movies.length>0 ?
        <>
          <div className='main__pagination-container'>
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
          {selectedGenres.length>0?<h2 className='main__main-heading'>Movies by Genre</h2>
          :
          keyword.trim().length>0?<h2 className='main__main-heading'>Search Results</h2>
          :<h2 className='main__main-heading'>Popular Movies</h2>}
          <div className='main__movies-container'>
            {movies.map((movie)=>
              <MovieCard key={movie.id} movie={movie}/>)
            }
          </div>
          <div className='main__pagination-container'>
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        </>
        :
        <>
          {debounceKeyword.length>0&&movies.length===0
          ? 
          (
            <div className="message">
            <h2 className='message__text'>Your search for "{keyword}" did not have any matches.</h2>
            </div>
          
          )
          : null}
          {selectedGenres.length>0&&movies.length===0 ? 
          <>
          <>
            <div className="message">
              <h2 className='message__text'>No movies found by those genres combination.</h2>  
            </div>
          </>
          </>
          : null}
        </>
      }    
    </>
  )
}

export default Main