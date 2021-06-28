import express from 'express'
import { jwtAuth, adminOnly } from '../auth/authUser.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts).post(jwtAuth, adminOnly, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(jwtAuth, adminOnly, deleteProduct)
  .put(jwtAuth, adminOnly, updateProduct)

export default router
