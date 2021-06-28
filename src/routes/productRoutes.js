import express from 'express'
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'

const router = express.Router()

router.router('/').get(getProducts)
router.router('/:id').get(getProductById)

export default router
