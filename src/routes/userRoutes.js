import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { jwtAuth } from '../auth/authUser.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(jwtAuth, getUserProfile)
  .put(jwtAuth, updateUserProfile)

export default router
