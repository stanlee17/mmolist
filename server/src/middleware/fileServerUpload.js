const ApiError = require('../utilities/ApiError');
const path = require('path');
const debugWRITE = require('debug')('app:post');

const fileServerUpload = async (req, res, next) => {
  debugWRITE(req.body);

  if (req.files) {
    debugWRITE(req.files);
    // [1] STORE FILE (SINGLE)

    for (const key in req.files) {
      const file = req.files[key];
      const filename = Date.now() + '_' + file.name;

      const uploadPath = path.join(
        __dirname,
        '../../public/uploads/',
        filename
      );

      await new Promise((resolve) => {
        file.mv(uploadPath, (err) => {
          if (err)
            return next(
              ApiError.internal(
                'Your file request could not be processed at this time',
                err
              )
            );
          if (!err) {
            console.log(`Server Upload Successful: ${uploadPath}`);
            res.locals[key] = filename;
          }
          resolve(true);
        });
      });
    }
    return next();
  } else {
    next();
  }
};

module.exports = fileServerUpload;
