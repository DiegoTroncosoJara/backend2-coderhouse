import { createResponse } from '../utils.js'
import { TicketModel } from '../daos/mongodb/models/ticket.model.js'
import { cartDao } from '../daos/mongodb/cart.dao.js'
import Controllers from './controller.manager.js'
import { cartService } from '../services/cart.services.js'

import { prodDao } from '../daos/mongodb/product.dao.js'
export default class CartController extends Controllers {
  constructor () {
    super(cartService)
  }
  addProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params
      const { idProd } = req.params
      const newProdToUserCart = await this.service.addProdToCart(idCart, idProd)
      if (!newProdToUserCart)
        createResponse(res, 404, { msg: 'Error add product to cart' })
      else createResponse(res, 200, newProdToUserCart)
    } catch (error) {
      next(error)
    }
  }

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params
      const { idProd } = req.params
      const delProdToUserCart = await this.service.removeProdToCart(
        idCart,
        idProd
      )
      if (!delProdToUserCart)
        createResponse(res, 404, { msg: 'cart or prod not existant' })
      else
        createResponse(res, 200, { msg: `product ${idProd} deleted to cart` })
    } catch (error) {
      next(error)
    }
  }

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params
      const { idProd } = req.params
      const { quantity } = req.body
      const updateProdQuantity = await this.service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      )
      if (!updateProdQuantity)
        createResponse(res, 404, { msg: 'cart or prod not existant' })
      else createResponse(res, 200, updateProdQuantity)
    } catch (error) {
      next(error)
    }
  }

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params
      const clearCart = await this.service.clearCart(idCart)
      if (!clearCart) createResponse(res, 404, { msg: 'Error clear cart' })
      else createResponse(res, 200, clearCart)
    } catch (error) {
      next(error)
    }
  }

  purchaseCart = async (req, res) => {
    const cartId = req.params.cid
    try {
      const cart = await cartDao.getById(cartId)
      if (!cart)
        return res.status(404).json({ message: 'Carrito no encontrado' })

      const purchasedProducts = []
      const failedProducts = []

      for (const cartProd of cart.products) {
        const prod = await prodDao.getById(cartProd.product._id)
        if (prod.stock >= cartProd.quantity) {
          // Restar stock
          prod.stock -= cartProd.quantity
          await prod.save()

          // Sumar al monto total de compra
          purchasedProducts.push({
            product: prod._id,
            quantity: cartProd.quantity,
            price: prod.price
          })
        } else {
          failedProducts.push(cartProd.product._id)
        }
      }

      if (purchasedProducts.length === 0) {
        return res.status(400).json({
          message: 'No hay productos con stock suficiente para comprar',
          unprocessed: failedProducts
        })
      }

      // Calcular el total
      const totalAmount = purchasedProducts.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      )

      // Crear Ticket
      const ticket = await TicketModel.create({
        amount: totalAmount,
        purchaser: cart.userEmail // Asegúrate de tener el email en el carrito o pásalo por req.user
      })

      // Filtrar el carrito: dejar solo los productos que NO se pudieron comprar
      cart.products = cart.products.filter(cp =>
        failedProducts.includes(cp.product._id.toString())
      )
      await cart.save()

      res.json({
        message: 'Compra realizada',
        ticket,
        unprocessed: failedProducts
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al procesar la compra' })
    }
  }
}
