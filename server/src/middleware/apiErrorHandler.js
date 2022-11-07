// ERROR HANDLING MIDDLEWARE
// All errors to be passed to this middleware & issue response
const ApiError = require("../utilities/ApiError");

function apiErrorHandler(err, req, res, next) {
  // 1. Error = Pre-Defined Error Class Methods
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    // 2. Error "Catch-All"
  } else {
    console.log(err);
    res.status(500).json({
      message: "Oops! Something went wrong - please try again later!",
    });
  }
}

module.exports = apiErrorHandler;
