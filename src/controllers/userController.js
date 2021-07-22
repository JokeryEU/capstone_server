import UserModel from '../models/userModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'
import { auth, refreshJWT } from '../auth/tools.js'

// @description Auth user & get tokens
// @route POST /users/login
// @access Public
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.checkCredentials(email, password)
    const tokens = await auth(user)
    res.cookie('accessToken', tokens.accessToken, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })

    res.status(200).send(user)
  } catch (error) {
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
      role: 'User',
    })
    if (newUser) {
      const user = await UserModel.checkCredentials(
        req.body.email,
        req.body.password
      )
      const tokens = await auth(user)
      res.cookie('accessToken', tokens.accessToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })

      res.status(201).send(newUser)
    } else {
      throw new ErrorResponse('User already exists', 400)
    }
  } catch (error) {
    if (error.code === 11000) return next(new ErrorResponse([], 11000))

    next(new ErrorResponse(error.message, 400))
  }
}

// @description Logout user
// @route POST /users/logout
// @access Private
export const logoutUser = async (req, res, next) => {
  try {
    req.user.refreshToken = null
    await req.user.save()
    res.clearCookie('accessToken')

    res.status(200).send()
  } catch (error) {
    next(error)
  }
}

// @description Get new tokens for the logged user
// @route POST /users/refreshtokens
// @access Private
export const refreshTokens = async (req, res, next) => {
  const oldRefreshToken = req.user.refreshToken
  if (!oldRefreshToken) return next(new ErrorResponse('Sign in first', 400))

  try {
    const newTokens = await refreshJWT(oldRefreshToken)
    res.cookie('accessToken', newTokens.accessToken, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })

    res.send()
  } catch (error) {
    next(new ErrorResponse(error, 400))
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
      throw new ErrorResponse('Bad request', 400)
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
      throw new ErrorResponse('User not found', 404)
    } else {
      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
}

// @description Get user by ID
// @route GET /users/:id
// @access Private/Admin
export const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      res.status(200).send(user)
    } else {
      throw new ErrorResponse('User not found', 404)
    }
  } catch (error) {
    next(error)
  }
}

// @description Update user
// @route PUT /users/:id
// @access Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email || user.email
      user.role = req.body.role || user.role

      const updatedUser = await user.save()

      res.send(updatedUser)
    } else {
      throw new ErrorResponse('User not found', 404)
    }
  } catch (error) {
    next(error)
  }
}
