import mongoose from 'mongoose'
import app from './server.js'

const port = process.env.PORT || 3005
mongoose
  .connect(process.env.MONGODB_ADDRESS, {})
  .then(
    app.listen(port, () => {
      console.log('Running on port', port)
    })
  )
  .catch((err) => console.log(err))
