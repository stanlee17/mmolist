const { db } = require("../config/db");
const ApiError = require("../utilities/ApiError");

module.exports = {
  // GET ALL GAMES
  async getGames(req, res, next) {
    try {
      const gamesRef = db.collection("games");
      const snapshot = await gamesRef.get();

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
            name: doc.data().name,
            classification: doc.data().classification,
            description: doc.data().description,
            status: doc.data().status,
            release_date: doc.data().release_date,
            rating: doc.data().rating,
            platforms: doc.data().platforms,
            engine: doc.data().engine,
            developer: doc.data().developer,
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
  // GET Games BY ID
};
