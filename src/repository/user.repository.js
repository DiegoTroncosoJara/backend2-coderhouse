import persistence from '../daos/persistence.js'
const { userDao } = persistence

import UserReqDTO from '../dtos/user/user.req.dto.js'
import UserResDTO from '../dtos/user/user.res.dto.js'

class UserRepository {
  constructor () {
    if (!userDao) throw new Error('userDao no inicializado')
    this.dao = userDao
  }

  registerUser = async userData => {
    try {
      const dto = new UserReqDTO(userData)
      console.log('dto: ', dto)

      const response = await this.dao.register(dto)
      return new UserResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  getUserById = async id => {
    try {
      const response = await this.dao.getById(id)
      return new UserResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  getUserByEmail = async email => {
    try {
      const response = await this.dao.getByEmail(email)
      console.log('response: ', response)

      if (!response) return null
      // AQUI NO OCUPO EL DTO PORQUE NECESITO LA PASS
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  updateUserCart = async (userId, cartId) => {
    try {
      return await userDao.update(userId, { cart: cartId })
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const userRepository = new UserRepository()
