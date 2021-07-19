import ProductModel from '../models/productModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'

// @description Fetch all products or query by name
// @route GET /products
// @access Public
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: new RegExp(req.query.keyword, 'i'),
          },
        }
      : {}

    const count = await ProductModel.countDocuments({ ...keyword })
    const products = await ProductModel.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.status(200).send({ products, page, pages: Math.ceil(count / pageSize) })
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
      throw new ErrorResponse(`id not found`, 404)
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
      throw new ErrorResponse('Product not found', 404)
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
    const product = new ProductModel({
      user: req.user._id,
      name: 'Sample name',
      price: 0,
      image: 'https://via.placeholder.com/250.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })

    const createdProduct = await product.save()
    if (createdProduct) {
      res.status(201).send(createdProduct)
    } else {
      throw new ErrorResponse('Bad request', 400)
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
      product.name = name || product.name
      product.price = price || product.price
      product.description = description || product.description
      product.image = req.files
        ? req.files.map((img) => img.path)
        : product.image
      product.brand = brand || product.brand
      product.category = category || product.category
      product.countInStock = countInStock || product.countInStock

      const updatedProduct = await product.save()
      res.send(updatedProduct)
    } else {
      throw new ErrorResponse('Product not found', 404)
    }
  } catch (error) {
    next(error)
  }
}

// @description Create new review
// @route POST /products/:id/reviews
// @access Private
export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body

    const product = await ProductModel.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      )

      if (alreadyReviewed) {
        throw new ErrorResponse('Product already reviewed', 400)
      }

      const review = {
        name: req.user.firstName + ' ' + req.user.lastName,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).send('Review added')
    } else {
      throw new ErrorResponse('Product not found', 404)
    }
  } catch (error) {
    next(error)
  }
}

// @description Get top rated products
// @route GET /products/toprated
// @access Public
export const getTopRatedProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3)

    res.send(products)
  } catch (error) {
    next(error)
  }
}
