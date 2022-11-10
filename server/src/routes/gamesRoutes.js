// Import express & router
const express = require("express");
const router = express.Router();

// Import auth module
const GamesPolicy = require("../policies/gamesPolicy");
const FilePolicy = require("../policies/filePolicy");
const GamesController = require("../controllers/gamesController");
const fileServerUpload = require("../middleware/fileServerUpload");

// Setup routes
module.exports = () => {
  // GET ALL ROUTE
  router.get("/", GamesController.getAllGames);

  // POST ROUTE
  router.post(
    "/",
    [
      GamesPolicy.validateGames,
      FilePolicy.filesPayloadExists,
      FilePolicy.fileSizeLimiter,
      FilePolicy.fileExtLimiter([".png", ".jpg", ".jpeg", ".gif"]),
      fileServerUpload,
    ],
    GamesController.postGames
  );

  // GET BY ID ROUTE

  // UPDATE/PUT ROTUE

  // DELETE ROUTE

  return router;
};
