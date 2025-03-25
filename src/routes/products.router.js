import { Router } from 'express'
import { productController } from '../controllers/product.controller.js'
import { productValidator } from '../middlewares/product.validator.js'

const router = Router()

// router.post('/', [productValidator], productController.createProd)
router.post('/', productController.createProd)

router.get('/', productController.getAll)

router.get('/:id', productController.getProdById)
export default router
