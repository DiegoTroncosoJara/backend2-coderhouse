import persistence from '../daos/persistence.js'
const { cartDao } = persistence

import {
  AddProductToCartReqDTO,
  UpdateProductQuantityReqDTO,
  UpdateCartReqDTO
} from '../dtos/cart/cart.req.dto.js'

import { CartResDTO } from '../dtos/cart/cart.res.dto.js'

class CartRepository {
  constructor () {
    this.dao = cartDao
  }

  createCart = async () => {
    try {
      const response = await this.dao.create()
      return new CartResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  getCartById = async id => {
    try {
      const response = await this.dao.getById(id)
      return new CartResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  addProductToCart = async (cartId, prodId) => {
    try {
      const dto = new AddProductToCartReqDTO(cartId, prodId)
      console.log('dto: ', dto)

      const response = await this.dao.addProdToCart(dto)
      console.log('response: ', response)

      return new CartResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  removeProductFromCart = async (cartId, productId) => {
    try {
      const response = await this.dao.removeProdToCart(cartId, productId)
      return new CartResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  updateCart = async (cartId, products) => {
    try {
      const dto = new UpdateCartReqDTO(products)
      const response = await this.dao.update(cartId, dto)
      return new CartResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  updateProductQuantity = async data => {
    try {
      const dto = new UpdateProductQuantityReqDTO(
        data.cartId,
        data.productId,
        data.quantity
      )
      const response = await this.dao.updateProdQuantityToCart(dto)
      return new CartResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  clearCart = async cartId => {
    try {
      const response = await this.dao.clearCart(cartId)
      return new CartResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const cartRepository = new CartRepository()
