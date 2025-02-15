import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import { errorHandler } from './middleware/errorHandler.js'
import { initMongoDB } from './db/connection.js'

const app = express()

// Iniciamos la conexión con MongoDB
const uri = 'mongodb://127.0.0.1:27017/coderhouse'
mongoose.connect(uri)

// Middlewares incorporados de Express
app.use(express.json()) // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({ extended: true })) // Formatea query params de URLs para peticiones entrantes.

app.use('/api/users', userRouter)

app.use(errorHandler)

initMongoDB()
  .then(() => console.log('base de datos coenctada'))
  .catch(error => console.log(error))

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Start Server in Port ${PORT}`)
})
