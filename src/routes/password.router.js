import express from 'express'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userDao } from '../daos/mongodb/user.dao.js'
import { createHash, isValidPassword } from '../utils.js'
const router = express.Router()

router.get('/reset-password', (req, res) => {
  const { token } = req.query
  console.log('GET RESET PASSWORD token: ', token)

  if (!token) return res.status(400).send('Token inválido')

  // Renderiza la vista Handlebars pasando el token si lo quieres usar
  res.render('resetPassword', { layout: false, token })
})

router.post('/reset-password', async (req, res) => {
  console.log('POST RESET PASSSWORD')

  const { token, newPassword } = req.body
  console.log('req.body: ', req.body)

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Faltan datos' })
    }

    // Validar token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // Buscar usuario
    const user = await userDao.getByEmail(decoded.email)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Verificar que la nueva contraseña NO sea igual a la anterior
    const isSamePassword = await bcrypt.compare(newPassword, user.password)
    if (isSamePassword) {
      return res.status(400).json({
        message: 'La nueva contraseña no puede ser igual a la anterior'
      })
    }

    // Hashear nueva contraseña
    const hashedPassword = createHash(newPassword)

    // Actualizar contraseña en BD
    user.password = hashedPassword
    await user.save()

    res.json({ message: 'Contraseña actualizada exitosamente' })
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: 'Token inválido o expirado' })
  }
})

export default router
