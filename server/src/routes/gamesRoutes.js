// Import express & router
const express = require("express");
const router = express.Router();

// Import auth module
const GamesController = require("../controllers/gamesController");

// Setup routes
module.exports = () => {
  // GET ALL ROUTE
  router.get("/", GamesController.getAllGames);

  // POST ROUTE
  // router.post("/", GamesController.postGames);

  // GET BY ID ROUTE

  // UPDATE/PUT ROTUE

  // DELETE ROUTE

  return router;
};
