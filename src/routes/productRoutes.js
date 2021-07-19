import express from 'express'
import { jwtAuth, adminOnly } from '../auth/authUser.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} from '../controllers/productController.js'
import { uploadToCloudinary } from '../middlewares/picUpload.js'

const router = express.Router()

router
  .route('/')
  .get(getProducts)
  .post(
    jwtAuth,
    adminOnly,
    uploadToCloudinary.array('prodImage', 4),
    createProduct
  )
router.get('/toprated', getTopRatedProducts)

router.route('/:id/reviews').post(jwtAuth, createProductReview)

router
  .route('/:id')
  .get(getProductById)
  .delete(jwtAuth, adminOnly, deleteProduct)
  .put(
    jwtAuth,
    adminOnly,
    uploadToCloudinary.array('prodImage', 4),
    updateProduct
  )

export default router
