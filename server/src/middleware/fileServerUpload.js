const ApiError = require("../utilities/ApiError");
const path = require("path");
const debugFILE = require("debug")("app:file");

const fileServerUpload = (req, res, next) => {
  if (req.files) {
    // 1. STORE FILE
    const file = req.files.image;
    debugFILE(`Image for Server Processing: ${file.name}`);

    // 2. APPEND UNIQUE FILENAME EXTENSION
    const filename = Date.now() + "_" + file.name;
    debugFILE(`Unique Filename: ${filename}`);

    // 3. DECLARE SERVER STORAGE DIRECTORY PATH
    const uploadPath = path.join(__dirname, "../../public/uploads/", filename);

    // 4. MOVE FILE TO SERVER STORAGE ("mv" function returns a PROMISE - CANNOT USE ASYNC-AWAIT)
    file
      .mv(uploadPath)
      .then(() => {
        // 5. STORE UNIQUE FILENAME IN RES.LOCALS OBJECT & PASS TO NEXT MIDDLEWARE
        console.log(`Server Upload Successful: ${uploadPath}`);
        res.locals.filename = filename;
        next();
      })
      .catch((err) => {
        if (err)
          return next(
            ApiError.internal(
              "Your file request could not be processed at this time",
              err
            )
          );
      });
  } else {
    next();
  }
};

module.exports = fileServerUpload;
