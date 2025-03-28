import persistence from '../daos/persistence.js'
const { prodDao } = persistence
import ProductResDTO from '../dtos/product/product.res.dto.js'
import ProductReqDTO from '../dtos/product/product.req.dto.js'

class ProductRepository {
  constructor () {
    this.dao = prodDao
  }

  createProd = async product => {
    try {
      const prodDTO = new ProductReqDTO(product)

      return await this.dao.create(prodDTO)
    } catch (error) {
      throw new Error(error)
    }
  }

  getProdById = async id => {
    try {
      const response = await this.dao.getById(id)
      return new ProductResDTO(response)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const prodRepository = new ProductRepository()
