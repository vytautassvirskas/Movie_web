import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainContext from '../../context/MainContext';
import "./Header.css";
import logo from "../../assets/movies.png"
import searchIcon from "../../assets/search.svg"
import deleteIcon from "../../assets/delete.svg"

//components
import MovieCard from '../MovieCard/MovieCard';

const Header = () => {
    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [trendingMovie, setTrendingMovie] =useState({})
    const [trendingMovies, setTrendingMovies] =useState([])
    const [repeat, setRepeat] = useState(false);
    const {keyword, setKeyword, 
        setIsOpened, getTrailer,
        getMovieDetails, setModalData} = useContext(MainContext);

    //reacts slick settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1180,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
              },
            },
        ]
    };
    
    //repeat
    // keyword.trim().length===0 &&
    // setTimeout(() => {
    //     setRepeat(!repeat);
    // }, 10000);

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //trending movies for carousel and one trending movie for header cover
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key='+
        API_KEY
        +'&language=en-US&page=1')
        .then(resp=>{
            const moviePerPage=resp.data.results.length;
            const randomNumber=getRandomIntInclusive(0, moviePerPage-1);
            // console.log(resp);
    
            if(trendingMovie.id===resp.data.results[randomNumber].id){
                setTrendingMovie(resp.data.results[getRandomIntInclusive(0, moviePerPage-1)])
            }else{
                setTrendingMovie(resp.data.results[randomNumber])
            }
            setTrendingMovies(resp.data.results);
        })
        .catch((error) => console.log(error));

    },[API_KEY,repeat])

    // useEffect(() => {
    //     console.log("isSearchedOpen:", isSearchOpen)
    // }, [isSearchOpen])

    // useEffect(() => {
    //     console.log("keyword:"+keyword)
    //     console.log(keyword.length)
    // }, [keyword])

    useEffect(() => {
        console.log("trendingMovie:", trendingMovie)
        // console.log("trendingMovies:", trendingMovies)
    }, [trendingMovie,trendingMovies])

  return (
    <header className={keyword.trim().length === 0 ?'header':""}>
        <nav className="header__nav">
            <div className='header__logo-wrapper'
            onClick={()=>{
            // setSingleMovie({data:{},credits:{}}) //pakeisti i modalData
            setKeyword("")
            }}>
                <img src={logo} alt="logo" /> 
            </div>
                {isSearchOpen ? 
                <div className='header__search-box' 
                onClose={
                    ()=>{
                        setIsSearchOpen(false);
                        setKeyword('');
                    }
                }>
                    <div className='header__search-icon-wrapper'>
                        <img className='header__search-icon' src={searchIcon} alt="search"></img>
                    </div>
                    <input
                    value={keyword}
                    className='header__search-input' 
                    type="text" 
                    placeholder='Search for a movie'
                    autoFocus
                    onBlur={()=>keyword.length===0&&setIsSearchOpen(false)}
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
            keyword.trim().length===0  &&
            <>
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
                        getMovieDetails(trendingMovie.id)
                    }}
                    >Play trailer</button>
                    </div>
                </div>

            <div className="header__slider-wrapper">
                <h2 className="header__slider-title"> Trending Movies </h2>
                <Slider {...settings}>
                    {trendingMovies.map((movie)=>
                        <MovieCard key={movie.id} movie={movie}/>
                    )}
                </Slider>
            </div>
            </>
            
        }
        

    </header>
  )
}

export default Header