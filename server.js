import cluster from 'cluster'
import { cpus } from 'os'
import http from 'http'
import mongoose from 'mongoose'
import app from './app.js'

const numCPUs = cpus().length

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  const server = http.createServer(app)
  server.listen(3000, () => {
    console.log(`Application running on port ${3000}`)
  })

  try {
    mongoose.connect('mongodb://localhost:27017/recruitment-higo')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
    console.log('Failed connect to MongoDB')
  }

  console.log(`Worker ${process.pid} started`)
}
