import express from "express";
import cors from "cors";
import passport from "passport";
import oauth from "./auth/oauth.js";
import ErrorResponse from "./middlewares/errorResponse.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {
  notFoundErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
  unauthorizedErrorHandler,
  forbiddenErrorHandler
} from "./middlewares/errorHandlers.js";
import listEndpoints from "express-list-endpoints";

const app = express();

const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];

const corsOptions = {
  origin: function (origin, next) {
    if (whiteList.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new ErrorResponse(`NOT ALLOWED BY CORS`, 403));
    }
  },
};

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// ROUTES


// ERROR HANDLERS
app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(unauthorizedErrorHandler);
app.use(forbiddenErrorHandler);
app.use(catchAllErrorHandler);


const port = process.env.PORT || 3005;
console.table(listEndpoints(app));

mongoose
  .connect(process.env.MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    app.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
