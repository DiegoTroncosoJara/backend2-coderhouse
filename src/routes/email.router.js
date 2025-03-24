import { Router } from 'express'
import {
  sendGmailHBS,
  sendMailEthereal,
  sendMailEtherealHBS,
  sendPasswordResetEmail
} from '../controllers/email.controller.js'

const router = Router()

router.post('/send', sendMailEthereal)
router.post('/sendHBS', sendMailEtherealHBS)
router.post('/send-gmail', sendGmailHBS)

// router.post('/reset-password-email', sendPasswordResetEmail)

export default router
