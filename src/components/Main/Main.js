import Axios from 'axios';
import React, {useEffect} from 'react'

const Main = () => {
    const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
    useEffect(() => {
        Axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+API_KEY+"&language=en-US")

        // zanrai
        // Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY+"&language=en-US")

        // trailer
        // Axios.get("https://api.themoviedb.org/3/movie/550/videos?api_key="+API_KEY+"&language=en-US")
        .then((resp)=>{
            console.log(resp);
        })
    },[API_KEY])

  return (
    <div style={{fontSize:40,color:"white"}}>Labas</div>
  )
}

export default Main