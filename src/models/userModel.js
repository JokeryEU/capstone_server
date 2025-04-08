import { Schema, model } from 'mongoose'
import { password } from 'bun'
import ErrorResponse from '../middlewares/errorResponse.js'

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Minimum length must be 8 chars'],
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    refreshToken: { type: String },
    googleId: { type: String },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await password.hash(this.password, {
      algorithm: 'bcrypt',
      cost: parseInt(process.env.SALT_ROUNDS),
    })
  }
  next()
})

userSchema.statics.checkCredentials = async function (email, enteredPassword) {
  const user = await this.findOne({ email })
  if (user) {
    const isMatch = password.verify(enteredPassword, user.password)
    if (isMatch) return user
    else throw new ErrorResponse('Invalid email or password', 401)
  } else throw new ErrorResponse('Invalid email or password', 401)
}

userSchema.methods.toJSON = function () {
  const user = this

  const userObject = user.toObject()

  delete userObject.password
  delete userObject.__v
  delete userObject.refreshToken
  return userObject
}

export default model('User', userSchema)
