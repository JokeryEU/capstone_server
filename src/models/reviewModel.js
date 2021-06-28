import mongoose from 'mongoose'

const { Schema } = mongoose

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Number,
      trim: true,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export default reviewSchema
