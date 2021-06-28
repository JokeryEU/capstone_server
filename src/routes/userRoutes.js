import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
import { jwtAuth } from '../auth/authUser.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)
router.route('/profile').get(jwtAuth, getUserProfile)

export default router
