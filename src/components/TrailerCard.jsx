import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TrailerCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state?.movie;
    const [movieTrailer, setMovieTrailer] = useState(null);

    const APIKEY = `b1f3cac6cb3cec4556e42f3a553fddec`;

    const get_TrailerMovie = async(id) =>{
        try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}`);
        const responseData = await response.json();
        setMovieTrailer(responseData.results[0].key);
        } catch(error) {
            console.log("Error fetching Trailer", error);
        }
    }
    useEffect(()=>{
        get_TrailerMovie(movie.id)
    }, [movie])
    
  return (
    <>
      <div className="trailer-card text-light mt-4 mb-4">
            <div className="container d-flex justify-content-center gap-3 trailer-item">
                <div className='left'>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                </div>
                <div className='right'>
                    <h3>{movie.original_title} ({movie.release_date?.split('-')[0]})</h3>
                    <p className='txt-color'>{movie.title}</p>
                    <div className='d-flex gap-3 mb-4'>
                    <button className='btn btn-danger'>Action</button>
                    <button className='btn btn-danger'>Thriller</button>
                    </div>
                    <button className='btn btn-secondary mb-3'>Watch Trailer</button>
                    <h4>Overview</h4>
                    <p className='text-left'>{movie.overview}</p>
                    <div className='d-flex gap-5 flex-wrap'>
                        <div>
                            <h6>status:</h6>
                            <p className='txt-color'>Released</p>
                        </div>
                        <div>
                            <h6>Released Date:</h6>
                            <p className='txt-color'>{movie.release_date}</p>
                        </div>
                        <div>
                            <h6>Runtime:</h6>
                            <p className='txt-color'>2hour 45min</p>
                        </div>
                    </div>
                    <div className="line mt-4"></div>
                </div>
            </div>
            </div>

            <div className="">
                <div className="responsive-iframe-container">
           <iframe src={`https://www.youtube.com/embed/${movieTrailer}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
</iframe>
</div>

            </div>
            
    </>
  )
}

export default TrailerCard
