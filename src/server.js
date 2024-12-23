import express from 'express'
import cors from 'cors'
import ErrorResponse from './middlewares/errorResponse.js'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
  unauthorizedErrorHandler,
  forbiddenErrorHandler,
  duplicateRequestErrorHandler,
} from './middlewares/errorHandlers.js'
import { jwtAuth } from './auth/authUser.js'
import listEndpoints from 'express-list-endpoints'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express()

const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD]

const corsOptions = {
  origin: function (origin, next) {
    if (whiteList.indexOf(origin) !== -1) {
      next(null, true)
    } else {
      next(new ErrorResponse(`NOT ALLOWED BY CORS`, 403))
    }
  },
  credentials: true,
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// ROUTES

app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/orders', orderRoutes)

app.use('/config/paypal', jwtAuth, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// ERROR HANDLERS
app.use(badRequestErrorHandler)
app.use(duplicateRequestErrorHandler)
app.use(notFoundErrorHandler)
app.use(unauthorizedErrorHandler)
app.use(forbiddenErrorHandler)
app.use(catchAllErrorHandler)

console.table(listEndpoints(app))

export default app
