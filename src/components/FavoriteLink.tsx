import React from 'react'
import { Link } from 'react-router-dom'
import { FavLink } from '@/types'

const FavoriteLink: React.FC<FavLink> = ({ route, name, isFavorite, toggleFavorite }) => {
  return (
    <div className="box">
      <Link to={route}>
        <h3>{name}</h3>
      </Link>
      <span className="star-icon" onClick={() => toggleFavorite(route)}>
        {isFavorite ? '★' : '☆'}
      </span>
    </div>
  )
}

export default FavoriteLink
