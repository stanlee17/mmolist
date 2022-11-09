// CUSTOM ERROR UTILITY CLASS
const debugError500 = require("debug")("app:error500");

class ApiError {
  // CONSTRUCTOR & PROPERTIES
  constructor(code, message, err) {
    this.code = code;
    this.message = message;
    this.err = err;
  }

  // CLASS METHODS:
  // [400] Bad Request
  static badRequest(msg) {
    return new ApiError(400, `Bad Request: ${msg}`);
  }
  // [404] Not Found
  static notFound() {
    return new ApiError(404, "Resource Not Found");
  }

  // [413] Entity too large
  static tooLarge(msg) {
    return new ApiError(413, `Upload failed: ${msg}`);
  }

  // [422] (NEW!) Entity Too Large
  static cannotProcess(msg) {
    return new ApiError(422, `Upload Failed: ${msg}`);
  }

  // [500] Internal Server Error
  static internal(msg, err) {
    debugError500(err);
    return new ApiError(500, `Internal Server Error: ${msg}`);
  }
}

module.exports = ApiError;
