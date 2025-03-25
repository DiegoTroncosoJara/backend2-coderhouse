import Services from './service.manager.js'
// import { prodDao } from "../daos/mongodb/product.dao.js";
import persistence from '../daos/persistence.js'
const { prodDao } = persistence

import { prodRepository } from '../repository/product.repository.js'

class ProductService extends Services {
  constructor () {
    super(prodDao)
  }

  createProd = async data => {
    try {
      console.log('data: ', data)

      return await prodRepository.createProd(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  getProdById = async id => {
    try {
      return await prodRepository.getProdById(id)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const prodService = new ProductService()
