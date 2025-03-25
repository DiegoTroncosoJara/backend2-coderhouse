export class ProductInCartResDTO {
  constructor (product, quantity) {
    this.id = product._id
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.stock = product.stock
    this.quantity = quantity
  }
}

export class CartResDTO {
  constructor (cart) {
    this.id = cart._id
    this.products = cart.products.map(p => {
      console.log('p : ', p)
      return new ProductInCartResDTO(p.product, p.quantity)
    })
  }
}
