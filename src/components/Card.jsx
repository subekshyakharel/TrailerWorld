import React from 'react'

const Card = ({title, date, image}) => {
  return (
    <>
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${image}`}
          className="card-img-top"
          style={{ width: '100%', borderRadius: '8px' }}
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title text-light">{title}</h5>
          <p className="card-text text-light">{date}</p>
        </div>
      </div>
    </>
  )
}

export default Card
