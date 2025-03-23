// Para agregar un producto al carrito
export class AddProductToCartReqDTO {
  constructor (cartId, productId) {
    this.cartId = cartId
    this.productId = productId
  }
}

// Para actualizar la cantidad de un producto en el carrito
export class UpdateProductQuantityReqDTO {
  constructor (cartId, productId, quantity) {
    this.cartId = cartId
    this.productId = productId
    this.quantity = quantity
  }
}

// Para actualizar el carrito completo
export class UpdateCartReqDTO {
  constructor (products) {
    this.products = products // Array de objetos { product: ObjectId, quantity: Number }
  }
}
