import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import { jwtAuth, adminOnly } from '../auth/authUser.js'

const router = express.Router()

router.route('/').get(jwtAuth, adminOnly, getUsers)
router.post('/register', registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(jwtAuth, getUserProfile)
  .put(jwtAuth, updateUserProfile)

export default router
