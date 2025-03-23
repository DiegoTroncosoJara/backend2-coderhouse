export default class UserResDTO {
  constructor (user) {
    this.id = user._id
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.email = user.email
    this.cart = user.cart
    this.role = user.role
  }
}
