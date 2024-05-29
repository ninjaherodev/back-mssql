import express from 'express'
import { routerApi } from './routers/index.js'
process.loadEnvFile('.env.development')
const port = process.env.PORT ?? 3010
export const app = express()
app.disable('x-powered-by')
app.set('port', port)

routerApi(app)
