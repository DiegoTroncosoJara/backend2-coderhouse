export default class UserReqDTO {
  constructor (product) {
    this.nombre = product.name
    this.descripcion = product.description
    this.precio = product.price
    this.disponibilidad = product.stock
  }
}
