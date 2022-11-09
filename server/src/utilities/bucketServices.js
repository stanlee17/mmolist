const { bucket } = require("../config/db");
const fs = require("fs");
const uuid = require("uuid");
const debugBucket = require("debug")("app:bucket");

module.exports = {
  async storageBucketUpload(filename) {
    // 1. GENERATE RANDOM UUID STORAGE TOKEN
    debugBucket(`Firestore File Name: ${filename}`);
    const storageToken = uuid.v4();

    // 2. DECLARE FILEPATH & OPTIONS PARAMETER VARIABLES FOR UPLOAD
    const serverFilePath = `./public/uploads/${filename}`;
    const options = {
      destination: filename,
      resumable: true,
      validation: "crc32c",
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken,
        },
      },
    };

    // 3. CLOUD FIRESTORE UPLOAD METHOD CALL
    const result = await bucket.upload(serverFilePath, options);
    const bucketName = result[0].metadata.bucket;
    debugBucket(`Bucket Name: ${bucketName}`);

    // 4. CONSTRUCT DOWNLOAD URL
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;
    console.log(`File Successfully Uploaded to Storage Bucket: ${downloadURL}`);

    // 5. DELETE TEMPORARY FILE IN SERVER-SIDE UPLOADS
    fs.unlink(serverFilePath, (err) => {
      if (err) {
        debugBucket(err);
        return {
          message:
            "Error occurred in removing file from temporary local storage",
        };
      } else {
        debugBucket("File in temporary local storage deleted");
      }
    });

    return downloadURL;
  },
};
