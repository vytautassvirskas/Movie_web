import { useState,useEffect } from 'react';
import Axios from 'axios';
import MainContext from './context/MainContext';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import MovieModal from "./components/MovieModal/MovieModal";
import Genres from './components/Genres/Genres';
import './App.css';


function App() {
  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;

  const [keyword, setKeyword] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [modalData,setModalData]=useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const[isSearchStarted, setIsSearchStarted] = useState(false);

  
  //get movie  trailer
  const getTrailer = (movieId) =>{
    Axios.get("https://api.themoviedb.org/3/movie/"+
    movieId
    +
    "/videos?api_key="+
    API_KEY
    +"&language=en-US")
    .then(resp=>{
      const results=resp.data.results;
      // console.log("trailer APIE resp: ", results)
      results.length===0 && setModalData(currentModalData=> {return {...currentModalData, trailerId: null}})

      results.forEach(result=>{
        if(result.name==="Official Trailer"){
          setModalData((currentModalData)=> {
            return {...currentModalData, trailerId: result.key, trailerName: result.name}
          })
        }
          
        if(result.name.includes("Trailer") || result.name.includes("Teaser") || result.name.includes("Official")){
          setModalData(currentModalData=>{
            return {...currentModalData, trailerId: result.key, trailerName: result.name}
          })
        }   
      })
    })
    .catch(error=>console.log(error))
  }
    //create modal
    const handleModal = (movie) =>{
      setModalData(movie)
      getTrailer(movie.id)
      setIsOpened(true)
    }

    // console.log modaldata
    // useEffect(()=>{
    //   console.log("modalData from handleModal function: ", modalData);
    //   console.log("trailer from handleModal function: ", modalData.trailerId);
    // },[modalData])
    
  //API configuration
  // useEffect(()=>{
  //   Axios.get('https://api.themoviedb.org/3/configuration?api_key='
  //   +API_KEY)
  //   .then(resp=>{
  //     console.log("API congifuration:", resp);
  //   })
  //   .catch(error=>console.log(error))
  // },[API_KEY])

  const contextValues = {
    keyword, setKeyword, 
    isOpened, setIsOpened,
    modalData,setModalData,
    genres, setGenres,
    currentPage, setCurrentPage,
    selectedGenres, setSelectedGenres,
    isSearchStarted, setIsSearchStarted,
    handleModal
  }

  return (
    <>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Genres/>
        <MovieModal/>
        <Main/>
      </MainContext.Provider>
    </>
  );
}

export default App;
