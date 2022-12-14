import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainContext from '../../context/MainContext';
import "./Header.css";
import logo from "../../assets/movies.png";
import searchIcon from "../../assets/search.svg";
import deleteIcon from "../../assets/delete.svg";
import MovieCard from '../MovieCard/MovieCard';
import Loader from '../Loader/Loader';
import { getRandomIntInclusive } from '../../utils/utils';

const Header = () => {
    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [trendingMovie, setTrendingMovie] =useState({});
    const [trendingMovies, setTrendingMovies] =useState([]);
    const [repeat, setRepeat] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {keyword, setKeyword,
        setSelectedGenres, handleModal,setCurrentPage,isSearchStarted,setIsSearchStarted
    } = useContext(MainContext);

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
              breakpoint: 1550,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true,
              },
            },
            {
                breakpoint: 1350,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true,
                },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                infinite: true,
                dots: false,
              },
            },
        ]
    };
    
    // now playing movie changes every 10 seconds
    const movieChanger = (delay) => {
        let timerMovie = null;
        if(keyword.trim().length===0){
            timerMovie=setTimeout(() => {
                setRepeat(!repeat);
            }, delay);
        }else{clearTimeout(timerMovie)}
    }
    movieChanger(10000);

    const handleSatesReset=()=> {
        setKeyword("");
        setSelectedGenres([]);
        setCurrentPage(1);
        setIsSearchStarted(false)

    }

    const handleLogoClick = () => {
        handleSatesReset();
        setIsSearchBarOpen(false);
    };

    const handleClearSearch=()=>{
        handleSatesReset();
        document.querySelector("#header__search-input").focus();
    }
    
    const searchStopped=keyword.trim().length===0?true:false;
    
    useEffect(()=>{
        console.log("ilgis keyword", keyword.trim().length)
    },[keyword])

    //set search started state
    useEffect(()=>{
        if(searchStopped) {
            setIsSearchStarted(false)
            setKeyword("");
            return;
        }

        setIsSearchStarted(true)
        setCurrentPage(1);
        
    },[searchStopped])

    //tikrinimas
    useEffect(()=>{
        console.log("isSearchStarted tikrinu", isSearchStarted);
    },[isSearchStarted])

    //random movie picker for header cover
    const randomMoviePicker = (trendingMovie, data) => {
        const moviePerPage=data.length;
        const randomNumber=getRandomIntInclusive(0, moviePerPage-1);
        if(trendingMovie.id===data[randomNumber].id){
            return setTrendingMovie(data[getRandomIntInclusive(0, moviePerPage-1)]);
        }
        setTrendingMovie(data[randomNumber]);
    };
    
    //trending movies for carousel and one trending movie for header cover
    useEffect(()=>{
        setIsLoading(true);
        const url=`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(url)
        .then(resp=>{
            // console.log("trending movie from api", resp.data.results);
            randomMoviePicker(trendingMovie, resp.data.results);
            setTrendingMovies(resp.data.results);
        })
        .catch((error) => console.log(error))
        .finally(()=>setIsLoading(false));
    },[API_KEY])
    
    
    //trending movie changes after 10 seconds
    useEffect(()=>{
        trendingMovies.length>0 && randomMoviePicker(trendingMovie, trendingMovies);
    },[repeat]);

  
    if (isLoading) {
        return <Loader/>
    }
    return (
        <header className={!isSearchStarted ?'header':""}>
            <nav className="header__nav">
                <div className='header__logo-wrapper'
                onClick={handleLogoClick}>
                    <img src={logo} alt="logo" /> 
                </div>
                    {isSearchBarOpen ? 
                        <div className='header__search-box' 
                        >
                            <div className='header__search-icon-wrapper'>
                                <img className='header__search-icon' src={searchIcon} alt="search"></img>
                            </div>
                            <input
                            value={keyword}
                            className='header__search-input' 
                            id='header__search-input'
                            type="text" 
                            placeholder='Search for a movie'
                            autoFocus
                            onBlur={()=>keyword.trim().length===0&&setIsSearchBarOpen(false)}
                            onChange={(e)=>{
                                setKeyword(e.target.value)
                            }}
                            />
                            <div className='header__delete-icon-wrapper'>
                                {keyword.trim().length>0 &&
                                <img 
                                className='header__delete-icon' 
                                src={deleteIcon} 
                                alt="delete search button"
                                onClick={handleClearSearch}
                                ></img>
                                }
                            </div>
                        </div>
                        :
                        <div className='header__search-icon-wrapper ' onClick={()=>{
                            setIsSearchBarOpen(true)
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
                    onClick={()=>handleModal(trendingMovie)}
                    >
                    Play trailer
                    </button>
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