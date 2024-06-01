import z from 'zod'

const moviesSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo debe ser un string',
    required_error: 'El titulo es requerido.'
  }),
  year: z
    .number({
      invalid_type_error: 'año debe ser un numero',
      required_error: 'año es requerido.'
    })
    .int()
    .min(1900, { message: 'El año no puede ser menor al año de 1900' })
    .max(2025, { message: 'El año no puede ser mayor al 2025' }),
  duration: z
    .number({
      invalid_type_error: 'La duración debe ser un numero entero',
      required_error: 'La duración es requerido.'
    })
    .int()
    .positive({ message: 'La duración es en minutos no puede ser negativa' }),
  rate: z.number().min(0).max(10).default(5),
  poster: z
    .string()
    .url({ message: 'poster debe ser una Url valida' })
    .endsWith('.jpg'),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi'
    ]),
    {
      required_error: 'El genereo es requerido',
      invalid_type_error: ' el genero debe ser un array'
    }
  )
})

export const validateMovie = (object) => {
  return moviesSchema.safeParse(object)
}

export const validatePartialMovie = (object) => {
  return moviesSchema.partial().safeParse(object)
}
