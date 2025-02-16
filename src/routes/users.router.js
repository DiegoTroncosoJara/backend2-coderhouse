import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import { passportCall } from '../passport/passportCall.js'
import { roleAuth } from '../middlewares/roleAuth.js'

const router = Router()

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/current', [passportCall('current')], userController.privateData)

// Ruta protegida solo para administradores
router.get('/admin', [passportCall('jwt'), roleAuth('admin')], (req, res) => {
  res.json({ message: 'Bienvenido, administrador!' })
})

router.get('/logout', userController.logout)

export default router
