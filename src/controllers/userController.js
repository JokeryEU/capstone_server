import UserModel from '../models/userModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'
import { auth } from '../auth/tools.js'

// @description Auth user & get tokens
// @route POST /users/login
// @access Public
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.checkCredentials(email, password)
    const tokens = await auth(user)
    res.cookie('accessToken', tokens.accessToken, {
      sameSite: 'lax',
      httpOnly: true,
    })
    res.cookie('refreshToken', tokens.refreshToken, {
      sameSite: 'lax',
      httpOnly: true,
    })
    res.status(200).send()
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// @description Register a new user
// @route POST /users/register
// @access Public
export const registerUser = async (req, res, next) => {
  try {
    const newUser = await UserModel.create(req.body)
    if (newUser) {
      const { _id } = newUser
      const user = await UserModel.checkCredentials(
        req.body.email,
        req.body.password
      )
      const tokens = await auth(user)
      res.cookie('accessToken', tokens.accessToken, {
        sameSite: 'lax',
        httpOnly: true,
      })
      res.cookie('refreshToken', tokens.refreshToken, {
        sameSite: 'lax',
        httpOnly: true,
      })
      res.status(201).send(_id)
    } else {
      next(new ErrorResponse('User already exists', 400))
    }
  } catch (error) {
    next(error)
  }
}

// @description Get user profile
// @route GET /users/profile
// @access Private
export const getUserProfile = async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
}
