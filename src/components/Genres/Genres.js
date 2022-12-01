import React, {useState,useEffect, useContext} from 'react'
import Axios from 'axios';

import MainContext from '../../context/MainContext';
import "./Genres.css"

const Genres = (props) => {
    const{setCurrentPage}=props
    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
    const {genres, setGenres,selectedGenres, setSelectedGenres, showGenres} = useContext(MainContext);

      //fetch genres of movies
    useEffect(()=>{
    Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US")
    .then(resp=>{
      // console.log("genres: ", resp);
      setGenres(resp.data.genres);
    })
    .catch(err=>{
      console.log(err);
      
    })
    },[API_KEY])
    useEffect(()=>{
      console.log("selectedGenres: ", selectedGenres);
    },[selectedGenres])

    const handleAdd = (genreId) => {
      setSelectedGenres([...selectedGenres, genreId]);
      setCurrentPage(1);
    }

    const handleRemove = (genreId) => {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
      setCurrentPage(1);
    }

    const handleGenre=(genreId)=>{
        if(selectedGenres.includes(genreId)){
            handleRemove(genreId);
        }else{
            handleAdd(genreId);
        }
    }

  return (
    <>
    {showGenres && 
      <div className='genres'
      >
        <div className="genres__container">
          {genres.map((genre)=>{
            return <div 
            key={genre.id} 
            className={'genres__genre'+(selectedGenres.includes(genre.id)?' genres__genre--active':'')}
            onClick={()=>{handleGenre(genre.id)}}
            >{genre.name}</div>
          })}
        </div>
          {selectedGenres.length > 0 && 
          <div className="genres__clear-genres-wrapper" onClick={()=>setSelectedGenres([])}>
            <button className="genres__delete-genres genres__genre">
              clear genres
            </button>

          </div>
          }
      </div>
    }
    </>
  )
}

export default Genres