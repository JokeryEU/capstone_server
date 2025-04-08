export const errorHandlers = (err, req, res, next) => {
  const statusCode = err.status || 500
  const defaultMessages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  }

  console.error('Error:', err)

  res.status(statusCode).json({
    status: statusCode,
    error: err.message || defaultMessages[statusCode],
    details: statusCode === 400 ? err.errorsList || null : undefined,
  })
}
