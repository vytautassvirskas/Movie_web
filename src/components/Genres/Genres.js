import React, {useState,useEffect, useContext} from 'react'
import Axios from 'axios';

import MainContext from '../../context/MainContext';
import "./Genres.css"

const Genres = (props) => {
    const{setCurrentPage}=props
    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
    const {genres, setGenres,selectedGenres, setSelectedGenres} = useContext(MainContext);

      //fetch genres of movies
    useEffect(()=>{
    Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US")
    .then(resp=>{
      console.log("genres: ", resp);
      setGenres(resp.data.genres);
    })
    .catch(err=>{
      console.log(err);
      
    })
    },[API_KEY])

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
    <div className='genres'
    >
        {genres.map((genre)=>{
            return <div 
                    key={genre.id} 
                    className={'genres__genre'+(selectedGenres.includes(genre.id)?' genres__genre--active':'')}
                    onClick={()=>{handleGenre(genre.id)}}
                    >{genre.name}</div>
        })}
    </div>
    </>
  )
}

export default Genres