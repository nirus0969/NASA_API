import React, { useState, useEffect } from 'react'
import FavoriteLink from './FavoriteLink'
import { LinkKey, getLink, links } from '../utils/links'

const HomePage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  console.log(favorites)

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    const storedShowOnlyFavorites = localStorage.getItem('showOnlyFavorites')
    if (storedShowOnlyFavorites) {
      setShowOnlyFavorites(JSON.parse(storedShowOnlyFavorites))
    }
  }, [])

  const toggleFavorite = (key: LinkKey) => {
    let updatedFavorites = [...favorites]
    if (favorites.includes(key)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== key)
    } else {
      updatedFavorites.push(key)
    }
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const toggleShowOnlyFavorites = () => {
    setShowOnlyFavorites(!showOnlyFavorites)
    localStorage.setItem('showOnlyFavorites', JSON.stringify(!showOnlyFavorites))
  }

  return (
    <div className="box" data-testid="homepage-1">
      <h2>Choose an API to explore</h2>
      <span className="star-icon home-star" onClick={toggleShowOnlyFavorites}>
        {showOnlyFavorites ? '★' : '☆'}
      </span>

      {showOnlyFavorites ? (
        favorites.length === 0 ? (
          <p>You have no favorites</p>
        ) : (
          favorites.map((favKey) => {
            const linkInfo = getLink(favKey as LinkKey)
            return (
              linkInfo && (
                <FavoriteLink
                  key={linkInfo.route}
                  route={linkInfo.route}
                  name={linkInfo.name}
                  isFavorite={true}
                  toggleFavorite={() => toggleFavorite(favKey as LinkKey)}
                />
              )
            )
          })
        )
      ) : (
        Object.keys(links).map((key) => {
          const link = getLink(key as LinkKey)
          return (
            <FavoriteLink
              key={link.route}
              route={link.route}
              name={link.name}
              isFavorite={favorites.includes(key)}
              toggleFavorite={() => toggleFavorite(key as LinkKey)}
            />
          )
        })
      )}
    </div>
  )
}

export default HomePage
