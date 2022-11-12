const { db } = require("../config/db");
const ApiError = require("../utilities/ApiError");
const {
  storageBucketUpload,
  deleteFileFromBucket,
} = require("../utilities/bucketServices");
const debugWRITE = require("debug")("app:write");
const debugREAD = require("debug")("app:read");

// Capitalizes first letter function
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

module.exports = {
  // GET ALL GAMES
  async getAllGames(req, res, next) {
    try {
      const gamesRef = db.collection("games");
      const snapshot = await gamesRef.orderBy("rating", "desc").get();

      // [400 ERROR] Check for users asking for non-existent docs
      if (snapshot.empty) {
        return next(
          ApiError.badRequest("The games you were looking for do not exist")
        );

        // SUCCESS GET REQUEST: Structure the data for client
      } else {
        let docs = [];
        snapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            title: doc.data().title,
            classification: doc.data().classification,
            description: doc.data().description,
            status: doc.data().status,
            release_date: doc.data().release_date,
            rating: doc.data().rating,
            engine: doc.data().engine,
            developer: doc.data().developer,
            trailer: doc.data().trailer,
            createdBy: doc.data().createdBy,
            cover_image: doc.data().cover_image,
          });
        });

        res.send(docs);
      }
    } catch (err) {
      return next(
        ApiError.internal("The games cannot be retrieved at this time", err)
      );
    }
  },

  // POST GAMES
  async postGames(req, res, next) {
    // Testing data posted to server
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(req.locals);

    // File Upload to Storage Bucket
    let downloadURL = null;

    try {
      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);
    } catch (err) {
      return next(
        ApiError.internal(
          "An error occured in uploading the cover image to storage",
          err
        )
      );
    }

    // Store games document query in variable & call ADD method
    try {
      const gamesRef = db.collection("games");
      const response = await gamesRef.add({
        title: capitalizeFirstLetter(req.body.title),
        classification: req.body.classification,
        description: capitalizeFirstLetter(req.body.description),
        status: req.body.status,
        release_date: Number(req.body.release_date),
        rating: Number(req.body.rating),
        engine: capitalizeFirstLetter(req.body.engine),
        developer: capitalizeFirstLetter(req.body.developer),
        trailer: req.body.trailer,
        createdBy: req.body.createdBy,
        cover_image: downloadURL,
      });

      console.log(`Added Games with ID: ${response.id}`);
      res.send(response.id);
    } catch (err) {
      return next(
        ApiError.internal("Your request could not be saved at this time", err)
      );
    }
  },

  // GET Games BY ID
  async getGamesById(req, res, next) {
    debugREAD(req.params);

    try {
      const gamesRef = db.collection("games").doc(req.params.id);
      const doc = await gamesRef.get();

      if (!doc.exists) {
        return ApiError.badRequest(
          "The MMORPG you were looking for does not exist",
          err
        );
      } else {
        res.send(doc.data());
      }
    } catch (err) {
      ApiError.internal("Your request could not be saved at this time", err);
    }
  },

  // PUT - Update Games By Id
  async putGamesById(req, res, next) {
    debugWRITE(req.params);
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(req.locals);

    let downloadURL;
    try {
      if (req.files) {
        // Standard cloud storage upload
        const filename = res.locals.filename;
        downloadURL = await storageBucketUpload(filename);

        // NEW - Delete old image version in storage (if it exists)
        if (req.body.uploadedFile) {
          debugWRITE(`Deleting OLD image in storage: ${req.body.uploadedFile}`);
          const bucketResponse = await deleteFileFromBucket(
            req.body.uploadedFile
          );
        }
      } else if (req.body.cover_image) {
        console.log("No change to cover image in DB");
        downloadURL = req.body.cover_image;
      } else {
        return next(
          ApiError.badRequest(
            "The file you are trying to uploaded cannot be edited",
            err
          )
        );
      }
    } catch (err) {
      return next(
        ApiError.internal(
          "An error occured in uploading the image to storage",
          err
        )
      );
    }

    // Store games document query in variable
    try {
      const gamesRef = db.collection("games").doc(req.params.id);
      const response = await gamesRef.update({
        title: capitalizeFirstLetter(req.body.title),
        classification: req.body.classification,
        description: capitalizeFirstLetter(req.body.description),
        status: req.body.status,
        release_date: Number(req.body.release_date),
        rating: Number(req.body.rating),
        engine: capitalizeFirstLetter(req.body.engine),
        developer: capitalizeFirstLetter(req.body.developer),
        trailer: req.body.trailer,
        createdBy: req.body.createdBy,
        cover_image: downloadURL,
      });

      res.send(response);
    } catch (err) {
      return next(
        ApiError.internal("Your request could not be saved at this time", err)
      );
    }
  },
};
