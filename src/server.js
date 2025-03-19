import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import { errorHandler } from './middlewares/errorHandler.js'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'

import 'dotenv/config'
import './passport/jwt.js'

const app = express()

const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: { secret: process.env.SECRET_KEY },
    ttl: 180
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session(storeConfig))
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use(errorHandler)

const PORT = 8080

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err)
  })
