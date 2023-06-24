const Joi = require('joi');
const ApiError = require('../utilities/ApiError');
const debugJoi = require('debug')('app:joi');

module.exports = {
  // JOI VALIDATION FUNCTION/SCHEMA
  validateAuth(req, res, next) {
    debugJoi(req.body);
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
      picture: Joi.any(),
      uploadedFile: Joi.string(),
    });

    // 2. Call the function & pass in the request data (req.body)
    const { error, value } = schema.validate(req.body);

    // 3. Run the output of the function against test cases
    if (error) {
      debugJoi(error.details[0]);
      switch (error.details[0].context.key) {
        case 'username':
          next(ApiError.badRequest('You must provide a valid username'));
          break;
        case 'email':
          next(ApiError.badRequest('You must provide a valid email'));
          break;
        case 'password':
          next(ApiError.badRequest('You must provide a valid password'));
          break;
        case 'picture':
          next(
            ApiError.badRequest(
              'The existing picture URL are not in a valid format - please re-upload the image'
            )
          );
          break;
        case 'uploadedFile':
          next(
            ApiError.badRequest(
              'The existing file path are not in a valid format - please re-upload the image'
            )
          );
          break;
        default:
          next(
            ApiError.badRequest(
              'Invalid Form Invalid - please check form information and submit again'
            )
          );
          break;
      }
    } else {
      next();
    }
  },
};
