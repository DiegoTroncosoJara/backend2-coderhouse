import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import emailRouter from './routes/email.router.js'
import passwordRouter from './routes/password.router.js'

import { errorHandler } from './middlewares/errorHandler.js'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import exphbs from 'express-handlebars'

import { resetPassword } from './controllers/email.controller.js'
import path from 'path'

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

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(path.resolve(), 'src/views'))

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/email', emailRouter)

app.use('/api/auth', passwordRouter)

// Endpoint que recibe el POST del frontend
// router.get('/reset-password', (req, res) => {
//   const token = req.query.token
//   res.render('resetPassword', { token })
// })

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
