import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';

import MainContext from '../../context/MainContext';

import "./Header.css";
import logo from "../../assets/movies.png"
import searchIcon from "../../assets/search.svg"
import deleteIcon from "../../assets/delete.svg"

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [trendingMovie, setTrendingMovie] =useState([])
    const {keyword, setKeyword} = useContext(MainContext);

    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;

    useEffect(()=>{
        // axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key='+
        // API_KEY
        // +'&language=en-US&page=1')
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key='+
        API_KEY+'&language=de-DE&page=1')
        .then(resp=>{
            console.log(resp);
            setTrendingMovie(resp.data.results[0]); //paemiau pirma is gautu
        })
    },[API_KEY])

    useEffect(() => {
        console.log("isSearchedOpen:"+isSearchOpen)
    }, [isSearchOpen])
    useEffect(() => {
        console.log("keyword:"+keyword)
    }, [keyword])

    useEffect(() => {
        console.log("trendingMovie:")
        console.log(trendingMovie)
    }, [trendingMovie])

  return (
    <header className='header'>
        <nav className={keyword.length>0 ? 'header__nav header__nav--nosearch' :  'header__nav'  }>
            <div className='header__logo-wrapper'>
                <img src={logo} alt="logo" />
            </div>
                {isSearchOpen ? 
                <div className='header__search-box'>
                    <div className='header__search-icon-wrapper'>
                        <img className='header__search-icon' src={searchIcon} alt="search"></img>
                    </div>
                    <input
                    value={keyword}
                    className='header__search-input' 
                    type="text" 
                    placeholder='Search for a movie'
                    autoFocus
                    // onFocus={e => console.log(e.currentTarget.select())}
                    onBlur={()=>{setIsSearchOpen(false)}}
                    onChange={e=>setKeyword(e.target.value)}
                    />
                    <div className='header__delete-icon-wrapper'>
                        {keyword.length>0 &&
                        <img 
                        className='header__delete-icon' 
                        src={deleteIcon} 
                        alt="delete"
                        onClick={()=>setKeyword("")}
                        ></img>
                        }
                    </div>
                </div>
                :
                <div className='header__search-icon-wrapper ' onClick={()=>{
                    setIsSearchOpen(true)
                    }}>
                    <img className='header__search-icon' src={searchIcon} alt="search"></img>
                </div>
                }
        </nav>
        {
            keyword.length===0 &&
            <div className='header__cover-container'>
                <img className='header__cover-image' 
                src={"https://image.tmdb.org/t/p/w1280"+trendingMovie.backdrop_path} 
                alt="poster" 
                />
                <h1 className='header__cover-title'>{trendingMovie.title}</h1>
                <button className='header__trailer-btn'>Play trailer</button>
            </div>
        }


    </header>
  )
}

export default Header