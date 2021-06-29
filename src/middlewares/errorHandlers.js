export const notFoundErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 404) {
    res.status(404).send(err.message || 'Error not found!')
  } else {
    next(err)
  }
}

export const badRequestErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 400) {
    res.status(400).send(err.message || 'Error not found!')
  } else {
    next(err)
  }
}

export const unauthorizedErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 401) {
    res.status(401).send(err.message || 'Error not found!')
  } else {
    next(err)
  }
}

export const forbiddenErrorHandler = (err, req, res, next) => {
  if (err.statusCode === 403) {
    res.status(403).send(err.message || 'Error not found!')
  } else {
    next(err)
  }
}

export const catchAllErrorHandler = (err, req, res, next) => {
  res.status(500).send('Generic Server Error')
  console.log(err)
}
