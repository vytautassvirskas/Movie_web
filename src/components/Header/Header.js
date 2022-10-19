import React, {useState, useEffect} from 'react'
import axios from 'axios';

import "./Header.css";
import logo from "../../assets/movies.png"
import searchIcon from "../../assets/search.svg"
import deleteIcon from "../../assets/delete.svg"

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key='+
        API_KEY
        +'&language=en-US&page=1')
    },[])

    useEffect(() => {
        console.log("isSearchedOpen:"+isSearchOpen)
    }, [isSearchOpen])

  return (
    <header className='header'>
        <nav className='header__nav'>
            <div className='header__logo-wrapper'>
                <img src={logo} alt="logo" />
            </div>
                {isSearchOpen ? 
                <div className='header__search-box'>
                    <div className='header__search-icon-wrapper'>
                        <img className='header__search-icon' src={searchIcon} alt="search"></img>
                    </div>
                    <input 
                    className='header__search-input' 
                    type="text" 
                    placeholder='Search for a movie'
                    autoFocus
                    // onFocus={e => console.log(e.currentTarget.select())}
                    onBlur={()=>{setIsSearchOpen(false)}}
                    />
                    <div className='header__delete-icon-wrapper'>
                        <img className='header__delete-icon' src={deleteIcon} alt="delete"></img>
                    </div>
                </div>
                :
                <div className='header__search-icon-wrapper' onClick={()=>{
                    setIsSearchOpen(true)
                    }}>
                    <img className='header__search-icon' src={searchIcon} alt="search"></img>
                </div>
                }
        </nav>
    </header>
  )
}

export default Header