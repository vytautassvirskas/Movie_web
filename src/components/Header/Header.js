import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

import MainContext from '../../context/MainContext';

import "./Header.css";
import logo from "../../assets/movies.png"
import searchIcon from "../../assets/search.svg"
import deleteIcon from "../../assets/delete.svg"

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [trendingMovie, setTrendingMovie] =useState([])
    const [repeat, setRepeat] = useState(false);
    const {keyword, setKeyword, setIsOpened, getTrailer, setModalData} = useContext(MainContext);

    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;


    // setTimeout(() => {
    //     setRepeat(!repeat);
    // }, 10000);

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key='+
        API_KEY
        +'&language=en-US&page=1')
        .then(resp=>{
            const moviePerPage=resp.data.results.length;
            const randomNumber=getRandomIntInclusive(0, moviePerPage-1);
            console.log(randomNumber);
            console.log(resp);
            setTrendingMovie(resp.data.results[randomNumber]);
        })
    },[API_KEY,repeat])

    // useEffect(() => {
    //     console.log("isSearchedOpen:"+isSearchOpen)
    // }, [isSearchOpen])

    // useEffect(() => {
    //     console.log("keyword:"+keyword)
    //     console.log(keyword.length)
    // }, [keyword])

    useEffect(() => {
        console.log("trendingMovie:")
        console.log(trendingMovie)
    }, [trendingMovie])

  return (
    <header className='header'>
        <nav className=
        {
            keyword ==="" ? 'header__nav' : 'header__nav header__nav--search' 
            // keyword.length>0 ? 'header__nav header__nav--search' :  'header__nav'  
        }>
            <div className='header__logo-wrapper'>
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
                
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
                <div className="header__cover-data">
                    <h1 className='header__cover-title'>{trendingMovie.title}</h1>
                    <p className='header__cover-overview'>{trendingMovie.overview}</p>
                    <div className="header__btns-wrapper">
                    <button 
                    className='header__trailer-btn'
                    onClick={()=>{
                        setIsOpened(true)
                        getTrailer(trendingMovie.id)
                        setModalData(trendingMovie)
                    }}
                    >Play trailer</button>
                    <button className='header__more-btn'>More info</button>
                    </div>

                </div>
            </div>
        }


    </header>
  )
}

export default Header