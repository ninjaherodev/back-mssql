import express from 'express'
process.loadEnvFile('.env.development')
const port = process.env.PORT ?? 3010
export const app = express()
app.set('port', port)
