import Controllers from './controller.manager.js'
import { userService } from '../services/user.services.js'
import UserResDTO from '../dtos/user/user.res.dto.js'

class UserController extends Controllers {
  constructor () {
    super(userService)
  }

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  login = async (req, res, next) => {
    try {
      console.log('login: ', req.body)

      const token = await this.service.login(req.body)
      res
        .cookie('token', token, { httpOnly: true })
        .json({ message: 'Login OK', token })
    } catch (error) {
      next(error)
    }
  }

  privateData = (req, res, next) => {
    try {
      //se podria guardar el id en el generateToken
      //y en este controller llamar al this.service.getById()
      if (!req.user)
        throw new Error('No se puede acceder a los datos del usuario')

      console.log('req.user: ', req.user)

      const user = new UserResDTO(req.user)

      res.json({
        user: user
      })
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()
