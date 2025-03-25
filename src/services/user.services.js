import { createHash, isValidPassword } from '../utils.js'
import Services from './service.manager.js'
// import { userDao } from "../daos/mongodb/user.dao.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { cartService } from './cart.services.js'
import persistence from '../daos/persistence.js'
const { userDao } = persistence
import { userRepository } from '../repository/user.repository.js'

import { sendPasswordResetEmail } from '../controllers/email.controller.js'
class UserService extends Services {
  constructor () {
    super(userDao)
  }

  generateToken = user => {
    const payload = {
      // _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
      cart: user.cart
    }

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '20m' })
  }

  getUserByEmail = async email => {
    try {
      return await userRepository.getUserByEmail(email)
    } catch (error) {
      throw new Error(error)
    }
  }

  register = async user => {
    try {
      const { email, password, isGithub } = user
      const existUser = await this.getUserByEmail(email)
      if (existUser) throw new Error('User already exists')
      if (isGithub) {
        const newUser = await userRepository.registerUser(user)
        return newUser
      }
      const cartUser = await cartService.createCart()
      console.log('cartUser: ', cartUser)

      const newUser = await userRepository.registerUser({
        ...user,
        password: createHash(password),
        cart: cartUser.id
      })
      return newUser
    } catch (error) {
      throw error
    }
  }

  login = async user => {
    try {
      const { email, password } = user
      const userExist = await this.getUserByEmail(email)
      console.log('userExist: ', userExist)

      if (!userExist) throw new Error('User not found')
      const passValid = isValidPassword(password, userExist)
      console.log('passValid: ', passValid)

      if (!passValid) throw new Error('incorrect credentials')
      return this.generateToken(userExist)
    } catch (error) {
      throw error
    }
  }

  forgotPassword = async email => {
    try {
      console.log('forgotPassword: ', email)

      const user = await userRepository.getUserByEmail(email)

      if (!user) throw new Error('Usuario no encontrado')

      await sendPasswordResetEmail(user)
    } catch (error) {
      throw error
    }
  }
}

export const userService = new UserService()
