import { Router } from 'express'
import { readJson } from '../util/index.js'
import { randomUUID } from 'node:crypto'
import {
  validateMovie,
  validatePartialMovie
} from '../schemas/movies.schema.js'

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

routerProducts.post('/', (req, res) => {
  const result = validateMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

routerProducts.patch('/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    res.status(404).json({ message: 'movie not exist' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})
