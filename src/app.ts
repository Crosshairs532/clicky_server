import express from 'express'
import cors from 'cors'
import { Routes } from './app/Routes'
export const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))

app.get('/api/clicky', (req, res) => {
  res.send('Clicky Server')
})

app.use('/api/clicky', Routes)
