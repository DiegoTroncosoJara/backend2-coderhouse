import {
  mailConfig,
  mailConfigHbs,
  transporter,
  transporterGoogle
} from '../services/email.service.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userDao } from '../daos/mongodb/user.dao.js'

export const sendMailEthereal = async (req, res) => {
  try {
    const response = await transporter.sendMail(mailConfig)
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
}

export const sendMailEtherealHBS = async (req, res) => {
  try {
    const response = await transporter.sendMail(mailConfigHbs)
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
}

export const sendGmailHBS = async (req, res) => {
  try {
    const response = await transporterGoogle.sendMail(mailConfigHbs)
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
}

export const sendPasswordResetEmail = async user => {
  const token = generateResetToken(user)
  console.log('token: ', token)

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Restablece tu contraseña',
    template: 'resetPasswordEmail',
    context: {
      name: user.first_name,
      resetLink
    }
  }

  await transporter.sendMail(mailOptions)
}

export const generateResetToken = user => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  })
}

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await userDao.getById(decoded.id)

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const isSamePassword = await bcrypt.compare(newPassword, user.password)
    if (isSamePassword) {
      return res.status(400).json({
        message: 'La nueva contraseña no puede ser igual a la anterior'
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    res.json({ message: 'Contraseña actualizada exitosamente' })
  } catch (error) {
    res.status(400).json({ message: 'Token inválido o expirado' })
  }
}
