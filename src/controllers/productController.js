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

// @description Delete a product
// @route DELETE /products/:id
// @access Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id)

    if (!product) {
      next(new ErrorResponse('Product not found', 404))
    } else {
      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
}

// @description Create a product
// @route POST /products
// @access Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    const newProduct = await ProductModel.create({
      ...req.body,
      user: req.user._id,
      image: req.file.path,
    })

    if (newProduct) {
      res.status(201).send('Created')
    } else {
      next(new ErrorResponse('Bad request', 400))
    }
  } catch (error) {
    next(error)
  }
}

// @description Update product
// @route PUT /products/:id
// @access Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, brand, category, countInStock } = req.body

    const product = await ProductModel.findById(req.params.id)

    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = req.file.path
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.send(updatedProduct)
    } else {
      next(new ErrorResponse('Product not found', 404))
    }
  } catch (error) {
    next(error)
  }
}
