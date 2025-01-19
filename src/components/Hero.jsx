import React, { useState } from 'react'
import bgmv from "../assets/back.jpg";
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

    const movieStyle = {
        backgroundImage: `url(${bgmv})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      };

      const APIKEY = `b1f3cac6cb3cec4556e42f3a553fddec`;

      const getMovieBySearch =async () =>{
        try{
          const response =await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchTerm}`)
          const responseData = await response.json();
          console.log(responseData.results);
          navigate(`/searched`, {state:{movies: responseData.results}})
        } catch(error) {
          console.log(error);
        }
      }
  return (
    <>

                <div className="hero" id="Hero">
              <div className="" style={movieStyle}>
                  <div className="bg">

                  <nav className="navbar">
                  <div className="container">
                    <h2>TrailerQuest</h2>
                  </div>
                </nav>
                <div className="hero-content container text-light"  >
                  <div>
                    <div className="text-center">
                      <h2>Search millions of movies</h2>
                      <p>
                        Find out more about the movie in the details before watching
                        them...
                      </p>
                    </div>
      
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Titles, People, Genres"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      value={searchTerm}
                      onChange={(e)=>setSearchTerm(e.target.value)}
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      id="button-addon2"
                      onClick={getMovieBySearch}
                    >
                      Search
                    </button>
                  </div>
      
                  </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default Hero
