import React, {useEffect, useContext} from 'react'
import Axios from 'axios';
import MainContext from '../../context/MainContext';
import "./Genres.css"

const Genres = () => {
  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
  const {genres, setGenres,selectedGenres, setSelectedGenres,setCurrentPage,isSearchStarted} = useContext(MainContext);

  //fetch genres of movies
  useEffect(()=>{ 
    Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US")
    .then(resp=>{;
      // console.log("genres API resp", resp)
      setGenres(resp.data.genres);
    })
    .catch(err=>{
      console.log(err);
    })
  },[API_KEY,setGenres])

    // console.log selected genres
  // useEffect(()=>{
  //   console.log("selectedGenres: ", selectedGenres);
  // },[selectedGenres])

  const handleAdd = (genreId) => {
    setSelectedGenres([...selectedGenres, genreId]);
    setCurrentPage(1);
  }

  const handleRemove = (genreId) => {
    setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    setCurrentPage(1);
  }

  const handleGenre=(genreId)=>{
    if(selectedGenres.includes(genreId)) return handleRemove(genreId);
    
    handleAdd(genreId);
  }

  const handleGenresClear=()=>{
    setSelectedGenres([]);
    setCurrentPage(1);
  }

  const isAlreadySelected=(genreId)=>{
    return selectedGenres.includes(genreId);
  }

  return (
    <>
    {!isSearchStarted ? 
      <div className='genres'>
        <div className="genres__container">
          {genres.map((genre)=>{
            return <div 
            key={genre.id} 
            className={'genres__genre'+(isAlreadySelected(genre.id)?' genres__genre--active':'')}
            onClick={()=>{handleGenre(genre.id)}}
            >{genre.name}</div>
          })}
        </div>
          {selectedGenres.length > 0 && 
          <div className="genres__clear-genres-wrapper" onClick={()=>handleGenresClear()}>
            <button className="genres__delete-genres genres__genre">
              clear genres
            </button>

          </div>
          }
      </div>
      :
      null
    }
    </>
  )
}

export default Genres