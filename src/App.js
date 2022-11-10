import { useState,useEffect } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Axios from 'axios';

import MainContext from './context/MainContext';

import Main from './components/Main/Main';
import Header from './components/Header/Header';
import MovieModal from "./components/MovieModal/MovieModal";

import './App.css';


function App() {
  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;

  const [keyword, setKeyword] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [trailer,setTrailer]=useState(null)
  const [modalData,setModalData]=useState({})

  const getMovieDetails = (movieId) => {
    Axios.get(`https://api.themoviedb.org/3/movie/
    ${movieId}?api_key=${API_KEY}&language=en-US`)
    .then((resp)=>{
      console.log(resp);
      // setModalData(resp.data);
      // setIsOpened(true);
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  const getTrailer = (movieId) =>{
    Axios.get("https://api.themoviedb.org/3/movie/"+
    movieId
    +
    "/videos?api_key="+
    API_KEY
    +"&language=en-US")
    .then(resp=>{
      const results=resp.data.results;
      console.log(results)
      if(results.length>0){
        results.filter(result=>{
          result.name==="Official Trailer" && setTrailer(result.key)
          
          if(
            result.name.includes("Trailer") || result.name.includes("Teaser")
          ){
            setTrailer(result.key)
          }

        })
      }
    })

  }

  //API configuration
  // useEffect(()=>{
  //   Axios.get('https://api.themoviedb.org/3/configuration?api_key='
  //   +API_KEY)
  //   .then(resp=>{
  //     console.log(resp);
  //   })
  //   .catch(error=>console.log(error))
  // },[API_KEY])

  const contextValues = {
    keyword, setKeyword, 
    isOpened, setIsOpened,
    trailer, setTrailer,
    modalData,setModalData,
    getTrailer, getMovieDetails
  }

  return (
    <>
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <MovieModal/>
        {/* <Main/> */}
        <Routes>
          <Route path='/' element={<Main/>}/>
        </Routes>
      </MainContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
