const { db } = require("../config/db");
const ApiError = require("../utilities/ApiError");

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
            cover_image: doc.data().cover_image,
            banner_image: doc.data().banner_image,
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
    try {
      // Testing data posted to server
      debugWRITE(req.body);
      debugWRITE(req.files);

      // Send back to dummy response
      res.send("Server upload TEST successful");
    } catch (err) {
      return next(
        ApiError.internal("Your request could not be processed", err)
      );
    }
  },

  // GET Games BY ID
};
