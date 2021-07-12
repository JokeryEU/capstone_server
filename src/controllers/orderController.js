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
      throw new ErrorResponse('No order items', 400)
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

// @description Get order by ID
// @route GET /orders/:id
// @access Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      'user',
      'firstName lastName email'
    )

    if (order) {
      res.send(order)
    } else {
      throw new ErrorResponse('Order not found', 404)
    }
  } catch (error) {
    next(error)
  }
}

// @description Update order to paid
// @route PUT /orders/:id/pay
// @access Private
export const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const updatedOrder = await order.save()
      res.send(updatedOrder)
    } else {
      throw new ErrorResponse('Order not found', 404)
    }
  } catch (error) {
    next(error)
  }
}

// @description Update order to delivered
// @route PUT /orders/:id/deliver
// @access Private/Admin
export const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id)

    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      const updatedOrder = await order.save()
      res.send(updatedOrder)
    } else {
      throw new ErrorResponse('Order not found', 404)
    }
  } catch (error) {
    next(error)
  }
}

// @description Get logged in user orders
// @route GET /orders/myorders
// @access Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id })

    res.send(orders)
  } catch (error) {
    next(error)
  }
}

// @description Get all orders
// @route GET /orders
// @access Private/Admin
export const getOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({}).populate(
      'user',
      '_id firstName lastName'
    )

    res.send(orders)
  } catch (error) {
    next(error)
  }
}
