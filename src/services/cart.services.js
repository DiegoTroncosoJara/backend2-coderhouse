import Services from './service.manager.js'
// import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
// const cartDao = new CartDaoMongoDB();
import persistence from '../daos/persistence.js'
const { cartDao } = persistence
import { cartRepository } from '../repository/cart.repository.js'

class CartServices extends Services {
  constructor () {
    super(cartDao)
  }

  createCart = async userId => {
    try {
      return await cartRepository.createCart(userId)
    } catch (error) {
      throw error
    }
  }

  addProdToCart = async (cartId, prodId) => {
    try {
      return await cartRepository.addProductToCart(cartId, prodId)
    } catch (error) {
      throw error
    }
  }

  removeProdToCart = async (cartId, prodId) => {
    try {
      return await cartRepository.removeProdToCart(cartId, prodId)
    } catch (error) {
      throw error
    }
  }

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      return await cartRepository.updateProdQuantityToCart(
        cartId,
        prodId,
        quantity
      )
    } catch (error) {
      throw error
    }
  }

  clearCart = async cartId => {
    try {
      return await cartRepository.clearCart(cartId)
    } catch (error) {
      throw error
    }
  }
}

export const cartService = new CartServices()
