// Import express & router
const express = require("express");
const router = express.Router();

// Import auth module
const GamesController = require("../controllers/gamesController");
const fileServerUpload = require("../middleware/fileServerUpload");

// Setup routes
module.exports = () => {
  // GET ALL ROUTE
  router.get("/", GamesController.getAllGames);

  // POST ROUTE
  router.post("/", fileServerUpload, GamesController.postGames);

  // GET BY ID ROUTE

  // UPDATE/PUT ROTUE

  // DELETE ROUTE

  return router;
};
