import React, { useEffect, useState } from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Card from './Card';
import './SwiperManual.css'; 
import { useNavigate } from 'react-router-dom';

const UpComing = () => {
      const APIKEY = `b1f3cac6cb3cec4556e42f3a553fddec`
      const [movies, setMovies] = useState([]);
      const navigate = useNavigate();

      const getUpComing= async () =>{
        try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}`);
        const responseData = await response.json();
        setMovies(responseData.results);
        // console.log(responseData.results);
        } catch(error) {
          console.log("Error fetching Upcoming movies", error);
        }
      }

      useEffect(()=>{
        getUpComing();
      }, []);

      const handleCardClick = (movie) =>{
        if(movie){
        navigate(`/upcoming/${movie.id}`, {state: {movie}});
        } else {
          console.error("Movie date is undefined!");
        }
      };
  return (
    <>
      <div className="trending mt-5 px-4">
        <h2 className="text-light">UpComing</h2>
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
    </>
  )
}

export default UpComing
