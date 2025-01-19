import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';

const SearchedMovies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movies = location.state?.movies || [];

  const handleCardClick = (movie) => {
    if (movie) {
      navigate(`/searched/${movie.id}`, { state: { movie } });
    } else {
      console.log('Movie not found...');
    }
  };

  return (
    <>
    <div>
        <h2 className='text-danger container mt-5'>'searched Movies'</h2>
        <div className='container d-flex justify-content-center gap-5 flex-wrap'>
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => handleCardClick(movie)}
          style={{ cursor: 'pointer', width:'250px' }}
          
        >
          <Card
            title={movie.original_title}
            date={movie.release_date}
            image={movie.poster_path}
          />
        </div>
      ))}
      </div>
      </div>
    </>
  );
};

export default SearchedMovies;
