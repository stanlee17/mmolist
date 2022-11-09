const ApiError = require("../utilities/ApiError");
const path = require("path");
const debugFILE = require("debug")("app:file");

const fileServerUpload = (req, res, next) => {
  if (req.files) {
    // 1. STORE FILE: COVER IMAGE & BANNER IMAGE
    const coverImgFile = req.files.cover_image;
    debugFILE(`Image for Server Processing: ${coverImgFile.name}`);

    const bannerImgFile = req.files.banner_image;
    debugFILE(`Image for Server Processing: ${bannerImgFile.name}`);

    // 2. APPEND UNIQUE FILENAME EXTENSION: COVER IMAGE & BANNER IMAGE
    const coverImgFileName = Date.now() + "_" + coverImgFile.name;
    debugFILE(`Unique Filename: ${coverImgFileName}`);

    const bannerImgFileName = Date.now() + "_" + bannerImgFile.name;
    debugFILE(`Unique Filename: ${bannerImgFileName}`);

    // 3. DECLARE SERVER STORAGE DIRECTORY PATH: COVER IMAGE & BANNER IMAGE
    const coverImgUploadPath = path.join(
      __dirname,
      "../../public/uploads/",
      coverImgFileName
    );

    const bannerImgUploadPath = path.join(
      __dirname,
      "../../public/uploads/",
      bannerImgFileName
    );

    // 4. MOVE FILE TO SERVER STORAGE ("mv" function returns a PROMISE - CANNOT USE ASYNC-AWAIT)
    coverImgFile
      .mv(coverImgUploadPath)
      .then(() => {
        // 5. STORE UNIQUE FILENAME IN RES.LOCALS OBJECT & PASS TO NEXT MIDDLEWARE
        console.log(`Server Upload Successful: ${coverImgUploadPath}`);
        res.locals.coverImgFileName = coverImgFileName;
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

    bannerImgFile
      .mv(bannerImgUploadPath)
      .then(() => {
        // 5. STORE UNIQUE FILENAME IN RES.LOCALS OBJECT & PASS TO NEXT MIDDLEWARE
        console.log(`Server Upload Successful: ${bannerImgUploadPath}`);
        res.locals.bannerImgFileName = bannerImgFileName;
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
