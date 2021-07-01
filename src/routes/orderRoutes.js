import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'
import { jwtAuth, adminOnly } from '../auth/authUser.js'

const router = express.Router()

router
  .route('/')
  .post(jwtAuth, addOrderItems)
  .get(jwtAuth, adminOnly, getOrders)
router.route('/myorders').get(jwtAuth, getMyOrders)
router.route('/:id').get(jwtAuth, getOrderById)
router.route('/:id/pay').get(jwtAuth, updateOrderToPaid)

export default router
