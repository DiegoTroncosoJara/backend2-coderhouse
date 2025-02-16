import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import 'dotenv/config'
import { userService } from '../services/user.services.js'

const verifyToken = async (jwt_payload, done) => {
  //req.user = jwt_payload
  if (!jwt_payload)
    return done(null, false, { messages: 'Usuario inexistente' })
  return done(null, jwt_payload)
}

/* ------------------------------------ - ----------------------------------- */

const cookieExtractor = req => {
  return req.cookies.token
}

const strategyCookiesConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY
}

passport.use('current', new JwtStrategy(strategyCookiesConfig, verifyToken))

/* ------------------------------------ - ----------------------------------- */

// Configuración de opciones para JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token de la cabecera
  secretOrKey: process.env.SECRET_KEY // Clave secreta para validar el token
}

// Estrategia de autenticación con JWT
passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await userService.getUserByEmail(jwtPayload.email) // Busca usuario en la BD
      if (!user) return done(null, false, { message: 'Usuario no encontrado' })

      return done(null, user) // Si lo encuentra, lo adjunta a req.user
    } catch (error) {
      return done(error, false)
    }
  })
)

passport.serializeUser((user, done) => {
  try {
    done(null, user._id)
  } catch (error) {
    done(error)
  }
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id)
    return done(null, user)
  } catch (error) {
    done(error)
  }
})
