import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import router from './routes/index.js'

const limiter = rateLimit({
  windowMs: 1 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: true
})

const compress = {
  level: 6,
  treshold: 100 * 1000
}

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression(compress))
app.use(limiter)
app.use('/api/v1', router)

export default app
