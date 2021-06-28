import express from 'express'
import { jwtAuth, adminOnly } from '../auth/authUser.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(jwtAuth, adminOnly, deleteProduct)

export default router
