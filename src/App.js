import { useState,useEffect } from 'react';
import Axios from 'axios';

import MainContext from './context/MainContext';

import Main from './components/Main/Main';
import Header from './components/Header/Header';

import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');

  const contextValues = {
    keyword, setKeyword
  }

  const API_KEY=process.env.REACT_APP_TMDB_API_KEY;

  useEffect(()=>{
    Axios.get('https://api.themoviedb.org/3/configuration?api_key='
    +API_KEY)
    .then(resp=>{
      // console.log(resp);
    })
    .catch(error=>console.log(error))
  },[API_KEY])

  return (
    <div className="App">
      <MainContext.Provider value={contextValues}>
        <Header />
        <Main/>
      </MainContext.Provider>
    </div>
  );
}

export default App;
