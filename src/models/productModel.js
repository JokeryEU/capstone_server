import mongoose from 'mongoose'
import reviewSchema from './reviewModel.js'

const { Schema, model } = mongoose

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)

export default model('Product', productSchema)
