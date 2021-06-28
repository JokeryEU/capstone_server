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
    const newUser = await UserModel.create({
      ...req.body,
      role: req.body.role === 'Admin' ? 'User' : 'User',
    })
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

// @description Update user profile
// @route PUT /users/profile
// @access Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = req.user

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.send(updatedUser)
    } else {
      next(new ErrorResponse('Bad request', 400))
    }
  } catch (error) {
    next(error)
  }
}

// @description Get all users
// @route GET /users
// @access Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({})

    res.status(200).send(users)
  } catch (error) {
    next(error)
  }
}

// @description Delete user
// @route DELETE /users/:id
// @access Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (!user) {
      next(new ErrorResponse('User not found', 404))
    }
    res.status(204).send('Deleted')
  } catch (error) {
    next(error)
  }
}
