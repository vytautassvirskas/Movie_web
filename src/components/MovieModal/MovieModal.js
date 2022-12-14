import React, {useContext} from 'react'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import YouTube from 'react-youtube';
import { MdClose } from "react-icons/md";

import MainContext from '../../context/MainContext';
import Loader from '../Loader/Loader';

import "./MovieModal.css"
import CinemaImg from "../../assets/cinema.jpg"

// modal box style
const style = { 
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "90vw",
    bgcolor: 'black',
    boxSizing: "border-box",
    border: 'none',
    boxShadow: 24,
};
// youtube player options
const opts = { 
    maxHeight: '400px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
}

const MovieModal = (props) => {
    const {isLoading} = props;
    const {isOpened, setIsOpened, modalData} = useContext(MainContext);
    if(isLoading) return <Loader></Loader>
    return (
        <>
        <Modal
        open={isOpened}
        onClose={() => setIsOpened(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        >
            <Fade in={isOpened}>
                <Box sx={style}>
                    <div className='modal'>
                        <div className='modal__close-btn-wrapper' onClick={() => setIsOpened(false)}>
                            <MdClose className='modal__close-btn'></MdClose>
                        </div>
                        <div className='modal__youtube'>
                            {modalData.trailerId === null ? <p className='modal__youtube-missing'>NO MOVIE TRAILER FOUND</p> : null}
                            <YouTube videoId={modalData.trailerId} opts={opts}  />
                        </div>
                        <div className="modal__data">
                            <img 
                            className="modal__cover-poster" 
                            src={modalData.backdrop_path ? "https://image.tmdb.org/t/p/w780"+modalData.backdrop_path : CinemaImg} 
                            alt="movie-poster" 
                            ></img>
                            <h1 className='modal__movie-title'>{modalData.title}</h1>
                            <p className='modal__movie-overview'>{modalData.overview}</p>
                            <div className="modal__data-bottom">
                                <span className='modal__movie-rating'>Rating: {modalData.vote_average&& modalData.vote_average.toFixed(1)}</span>
                                {/* <button 
                                className="modal__more-btn"
                                >More info</button> */}
                            </div>
                        </div>
                    </div>
                
                </Box>
            </Fade>
        </Modal>
        </>
    )
}

export default MovieModal