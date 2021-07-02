import express from 'express'
import { jwtAuth, adminOnly } from '../auth/authUser.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js'
import { uploadToCloudinary } from '../middlewares/picUpload.js'

const router = express.Router()

router
  .route('/')
  .get(getProducts)
  .post(
    jwtAuth,
    adminOnly,
    uploadToCloudinary.single('prodImage'),
    createProduct
  )

router.route('/:id/reviews').post(jwtAuth, createProductReview)

router
  .route('/:id')
  .get(getProductById)
  .delete(jwtAuth, adminOnly, deleteProduct)
  .put(
    jwtAuth,
    adminOnly,
    uploadToCloudinary.single('prodImage'),
    updateProduct
  )

export default router
