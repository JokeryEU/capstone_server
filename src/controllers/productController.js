import ProductModel from '../models/productModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'

// @description Fetch all products
// @route GET /products
// @access Public
export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({})

    res.status(200).send(products)
  } catch (error) {
    next(error)
  }
}

// @description Fetch single product
// @route GET /products/:id
// @access Public
export const getProductById = async (req, res, next) => {
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
}