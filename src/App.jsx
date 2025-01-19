import React from 'react'
import './App.css'
import Hero from './components/Hero'
import Trending from './components/Trending'
import { Route, Routes } from 'react-router-dom'
import TrailerCard from './components/TrailerCard'
import UpComing from './components/UpComing'
import NowInCinemas from './components/NowInCinemas'
import WhatsPopular from './components/WhatsPopular'
import SearchedMovies from './components/SearchedMovies'

const App = () => {
  return (
    <>
     
      <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <UpComing/>
          <Trending />
          <WhatsPopular/>
          <NowInCinemas/>
        </>
      } />
        <Route path='/trailer/:id' element = {<TrailerCard/>}/>
        <Route path='/upcoming/:id' element= {<TrailerCard/>}/>
        <Route path='/nowincinemas/:id' element={<TrailerCard/>}/>
        <Route path='/whatspopular/:id' element={<TrailerCard/>}/>
        <Route path='/searched' element={<SearchedMovies/>}/>
        <Route path='/searched/:id' element={<TrailerCard/>}/>
      </Routes>
    </>
  )
}

export default App
