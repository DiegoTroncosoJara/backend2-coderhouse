export default class ProductReqDTO {
  constructor (product) {
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.stock = product.stock
  }
}
