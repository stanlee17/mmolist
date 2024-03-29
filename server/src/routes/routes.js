// ROUTE FILE
const express = require('express');
const router = express.Router();

// Import sub-routes
const gamesRoutes = require('./gamesRoutes');
const authRoutes = require('./authRoutes');

// Setup routes within export function
module.exports = () => {
  // [A] HOME: Test GET Route (refactored)
  router.get('/', (req, res, next) => {
    res.send('Welcome to the MMOList API');
  });

  // [B] Sub routes
  router.use('/auth', authRoutes());
  router.use('/games', gamesRoutes());

  return router;
};
