export default class UserResDTO {
  constructor (product) {
    this.nombre = product.first_name
    this.apellido = product.last_name
    this.email = product.email
    this.edad = product.age
  }
}
