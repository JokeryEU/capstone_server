export default class ErrorResponse extends Error {
  constructor(message, statusCode, origin) {
    super(message);
    this.statusCode = statusCode;
    this.origin = origin;
  }
}
