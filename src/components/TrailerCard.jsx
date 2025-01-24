import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Card from './Card';
import './SwiperManual.css'; 

const TrailerCard = () => {
    const APIKEY = `b1f3cac6cb3cec4556e42f3a553fddec`;
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state?.movie;
    const [movies, setMovies] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState(null);


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

    const getSimilarMovies= async (id) =>{
            try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${APIKEY}`);
            const responseData = await response.json();
            setMovies(responseData.results);
            // console.log(responseData.results);
            } catch(error) {
              console.log("Error fetching Now in Cinemas movies", error);
            }
          }
    
          useEffect(()=>{
            getSimilarMovies(movie.id);
          }, []);

    // Modal 
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:'80%',
          height:'90%', 
          backgroundColor:'transparent',
          border:'none', 
          padding:'0',
        },
        overlay:{
            backgroundColor:'rgba(0, 0, 0, 0.7)',
        },
      };

      Modal.setAppElement('#root');

      const [modalIsOpen, setIsOpen] = useState(false);

      const openModal = () => setIsOpen(true);
      const closeModal = () => setIsOpen(false);
    // Modal End 

    const handleCardClick = (movie) =>{
        if(movie){
        navigate(`/similar/${movie.id}`, {state: {movie}});
        } else {
          console.error("Movie date is undefined!");
        }
      };
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
                    <button className='btn btn-secondary mb-3' onClick={openModal}>Watch Trailer</button>
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
{/* Modal for trailer  */}
            <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Movie Trailer Modal"
      >
        <button onClick={closeModal} style={{ float: 'right', margin: '10px', color:'black', padding:'5px', backgroundColor:'white' }}>close</button>
        <div style={{width:'100%', height:'100%'}}>
            <iframe style={{ width: '100%', height: '90%' }} src={`https://www.youtube.com/embed/${movieTrailer}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
        </div>
      </Modal>
    </div>

{/* similar Movies  */}
{!modalIsOpen &&(
    <div className=" mt-5 px-4">
        <h2 className="text-light">Similar Movies</h2>
        <div>
          <Swiper
            slidesPerView={6} // Default for large screens
            spaceBetween={20} // Equal spacing between cards
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              // Responsive breakpoints
              1440: { slidesPerView: 6, spaceBetween: 20 }, // Large desktops
              1300:{slidesPerView:5, spaceBetween:15},
              1200: { slidesPerView: 4, spaceBetween: 20 }, // Medium desktops
              900: { slidesPerView: 3, spaceBetween: 15 }, // Tablets
              576: { slidesPerView: 2, spaceBetween: 10 }, // Mobile
              320:{slidesPerView:1, spaceBetween:10}
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div onClick={()=>{handleCardClick(movie)}} style={{cursor:'pointer'}}>
                <Card  title={movie.original_title} date={movie.release_date} image={movie.poster_path} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
)}
            
    </>
  )
}

export default TrailerCard
