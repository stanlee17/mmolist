const Joi = require("joi");
const ApiError = require("../utilities/ApiError");
const debugJoi = require("debug")("app:joi");

module.exports = {
  // JOI VALIDATION FUNCTION/SCHEMA
  validateGames(req, res, next) {
    console.log(req.body);
    const schema = Joi.object({
      title: Joi.string().required(),
      classification: Joi.string().required(),
      description: Joi.string().min(3).max(2000).required(),
      status: Joi.string().required(),
      release_date: Joi.number().min(1985).max(99999999).required(),
      rating: Joi.number(),
      engine: Joi.string().required(),
      developer: Joi.string().required(),
      trailer: Joi.string().required(),
      createdBy: Joi.string().required(),
      cover_image: Joi.any(),
      filePath: Joi.string(),
    });

    // 2. Call the function & pass in the request data (req.body)

    const { error, value } = schema.validate(req.body);

    // 3. Run the output of the function against test cases
    if (error) {
      debugJoi(error);
      switch (error.details[0].context.key) {
        case "title":
          next(ApiError.badRequest("You must provide a valid title"));
          break;
        case "classification":
          next(ApiError.badRequest("You must provide a valid classification"));
          break;
        case "release_date":
          next(ApiError.badRequest("Please enter a valid release date"));
          break;
        case "engine":
        case "trailer":
        case "developer":
        case "status":
        case "description":
          next(
            ApiError.badRequest(
              "You must provide a additional information about the game"
            )
          );
          break;
        case "cover_image":
          next(
            ApiError.badRequest(
              "The existing cover image URL are not in a valid format - please re-upload the image"
            )
          );
          break;
        case "filePath":
          next(
            ApiError.badRequest(
              "The existing file path are not in a valid format - please re-upload the image"
            )
          );
          break;
        default:
          next(
            ApiError.badRequest(
              "Invalid Form Invalid - please check form information and submit again"
            )
          );
      }
    } else {
      next();
    }
  },
};
