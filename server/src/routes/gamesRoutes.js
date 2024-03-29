// Import express & router
const express = require('express');
const router = express.Router();

// Import auth module
const GamesPolicy = require('../policies/gamesPolicy');
const FilePolicy = require('../policies/filePolicy');
const GamesController = require('../controllers/gamesController');
const fileServerUpload = require('../middleware/fileServerUpload');

// Setup routes
module.exports = () => {
  // GET ALL ROUTE
  router.get('/', GamesController.getAllGames);

  // POST ROUTE
  router.post(
    '/',
    [
      GamesPolicy.validateGames,
      FilePolicy.filesPayloadExists,
      FilePolicy.fileSizeLimiter,
      FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif', '.webp']),
      fileServerUpload,
    ],
    GamesController.postGames
  );

  // GET BY ID ROUTE
  router.get('/:id', GamesController.getGamesById);

  // UPDATE/PUT BY ID ROUTE
  router.put(
    '/:id',
    [
      GamesPolicy.validateGames,
      FilePolicy.filesPayloadExists,
      FilePolicy.fileSizeLimiter,
      FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif', '.webp']),
      fileServerUpload,
    ],
    GamesController.putGamesById
  );

  // DELETE BY ID Route
  router.delete('/:id', GamesController.deleteGamesById);

  return router;
};
