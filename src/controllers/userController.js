import UserModel from '../models/userModel.js'
import ErrorResponse from '../middlewares/errorResponse.js'
import { jwtAuth } from '../auth/authUser.js'
import { auth, refreshJWT } from '../auth/tools.js'

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
