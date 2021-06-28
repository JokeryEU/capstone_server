import { verifyJWT } from './tools.js'
import UserModel from '../models/userModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'

export const jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken
    const decoded = await verifyJWT(token)
    const user = await UserModel.findOne({
      _id: decoded._id,
    })
    if (!user) {
      throw new ErrorResponse('Login again', 401)
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next()
  } else {
    const error = new ErrorResponse('Admin Only', 403)
    next(error)
  }
}
