import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  logoutUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { jwtAuth, adminOnly } from '../auth/authUser.js'

const router = express.Router()

router.route('/').get(jwtAuth, adminOnly, getUsers)
router.post('/register', registerUser)
router.post('/login', authUser)
router.post('/logout', jwtAuth, logoutUser)
router
  .route('/profile')
  .get(jwtAuth, getUserProfile)
  .put(jwtAuth, updateUserProfile)
router
  .route('/:id')
  .delete(jwtAuth, adminOnly, deleteUser)
  .get(jwtAuth, adminOnly, getUserById)
  .put(jwtAuth, adminOnly, updateUser)
export default router
