import { Router } from 'express'
import { routerProducts } from './products.router.js'

export const routerApi = (app) => {
  const router = Router()
  app.use('/api/v1', router)
  router.use('/products', routerProducts)
}
