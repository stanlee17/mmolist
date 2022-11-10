const { db } = require("../config/db");
const ApiError = require("../utilities/ApiError");
const { storageBucketUpload } = require("../utilities/bucketServices");
const debugWRITE = require("debug")("app:write");
const debugREAD = require("debug")("app:read");

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
        ApiError.internal("Your request could not be processed", err)
      );
    }

    try {
      const gamesRef = db.collection("games");
      const response = await gamesRef.add({
        title: req.body.title,
        classification: req.body.classification,
        description: req.body.description,
        status: req.body.status,
        release_date: Number(req.body.release_date),
        rating: Number(req.body.rating),
        engine: req.body.engine,
        developer: req.body.developer,
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
};
