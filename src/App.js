import { useState } from 'react';

import MainContext from './context/MainContext';

import Main from './components/Main/Main';
import Header from './components/Header/Header';

import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');

  const contextValues = {
    keyword, setKeyword
  }
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
