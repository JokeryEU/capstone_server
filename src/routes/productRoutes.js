import express from 'express'
import ProductModel from '../models/productModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'

const router = express.Router()

// @description Fetch all products
// @route GET /products
// @access Public

router.get('/', async (req, res, next) => {
  try {
    const products = await ProductModel.find({})

    res.status(200).send(products)
  } catch (error) {
    next(error)
  }
})

// @description Fetch single product
// @route GET /products/:id
// @access Public

router.get('/:id', async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id)

    if (product) {
      res.status(200).send(product)
    } else {
      next(new ErrorResponse(`id not found`, 404))
    }
  } catch (error) {
    next(error)
  }
})

export default router
