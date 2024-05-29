import { Router } from 'express'
import { readJson } from '../util/index.js'

const movies = readJson('../movies.json')
export const routerProducts = Router()

routerProducts.get('/', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filterMovies = movies.filter((movie) => {
      return (
        Array.isArray(movie?.genre) &&
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    })
    return res.json(filterMovies)
  }
  res.json(movies)
})

routerProducts.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (!movie) {
    res.status(404).json({ message: 'movie no exist' })
  }
  res.json(movie)
})

routerProducts.post('/', (req, res) => {})
