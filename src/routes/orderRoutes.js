import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { jwtAuth } from '../auth/authUser.js'

const router = express.Router()

router.route('/').post(jwtAuth, addOrderItems)
router.route('/:id').get(jwtAuth, getOrderById)

export default router
