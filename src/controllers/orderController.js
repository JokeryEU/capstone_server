import OrderModel from '../models/orderModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'

// @description Create new order
// @route POST /orders
// @access Private
export const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
      next(new ErrorResponse('No order items', 400))
    } else {
      const order = new OrderModel({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()
      res.status(201).send(createdOrder)
    }
  } catch (error) {
    next(error)
  }
}
