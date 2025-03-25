import { prodService } from '../services/product.service.js'
import Controllers from './controller.manager.js'

class ProductController extends Controllers {
  constructor () {
    super(prodService)
  }

  createProd = async (req, res, next) => {
    try {
      const response = await this.service.createProd(req.body)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getProdById = async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await this.service.getProdById(id)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}

export const productController = new ProductController()
