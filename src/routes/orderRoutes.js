import express from 'express'
import { addOrderItems } from '../controllers/orderController.js'
import { jwtAuth } from '../auth/authUser.js'

const router = express.Router()

router.route('/').post(jwtAuth, addOrderItems)

export default router
