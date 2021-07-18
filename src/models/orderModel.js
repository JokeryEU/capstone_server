import mongoose from 'mongoose'

const { Schema, model } = mongoose

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          trim: true,
          required: true,
        },
        qty: {
          type: Number,
          trim: true,
          required: true,
        },
        image: [
          {
            type: String,
            trim: true,
            required: true,
          },
        ],
        price: {
          type: Number,
          trim: true,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, trim: true, required: true },
      city: { type: String, trim: true, required: true },
      country: { type: String, trim: true, required: true },
      postalCode: { type: String, trim: true, required: true },
      phoneNumber: { type: String, trim: true, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    paymentResult: {
      id: { type: String, trim: true },
      status: { type: String, trim: true },
      update_time: { type: String, trim: true },
      email_address: { type: String, trim: true },
    },
    itemsPrice: {
      type: Number,
      required: true,
      trim: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      trim: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      trim: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      trim: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

export default model('Order', orderSchema)
