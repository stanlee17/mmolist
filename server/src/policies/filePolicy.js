const ApiError = require("../utilities/ApiError");
const path = require("path");

// [1] VALIDATION: File exists
const filesPayloadExists = (req, res, next) => {
  if (!req.files && !req.body.filePath) {
    return next(ApiError.badRequest("No file uploaded"));
  }
  next();
};

// [2] VALIDATION: Check if file size exceeds set size
const fileSizeLimiter = (req, res, next) => {
  const MB = 10; // 10MB
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;

  if (req.files) {
    const coverImgFile = req.files.cover_image;
    const bannerImgFile = req.files.banner_image;

    if (coverImgFile.size > FILE_SIZE_LIMIT) {
      const message = `${coverImgFile.name.toString()} is over the file size limit of ${MB} MB.`;

      return next(ApiError.tooLarge(message));
    } else if (bannerImgFile.size > FILE_SIZE_LIMIT) {
      const message = `${bannerImgFile.name.toString()} is over the file size limit of ${MB} MB.`;

      return next(ApiError.tooLarge(message));
    }
  }
  next();
};

// [3] VALIDATION: Restrict file to accepted file extension types (images ONLY)
const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    if (req.files) {
      const coverImgfile = req.files.cover_image;
      const coverImgFileExt = path.extname(coverImgfile.name);

      const bannerImgfile = req.files.banner_image;
      const bannerImgFileExt = path.extname(bannerImgfile.name);

      const coverAllowed = allowedExtArray.includes(coverImgFileExt);
      const bannerAllowed = allowedExtArray.includes(bannerImgFileExt);

      if (!coverAllowed || !bannerAllowed) {
        const message =
          `Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
            ",",
            ", "
          );

        return next(ApiError.cannotProcess(message));
      }
    }

    next();
  };
};

const filePolicy = {
  filesPayloadExists,
  fileSizeLimiter,
  fileExtLimiter,
};

module.exports = filePolicy;
