// Import express & router
const express = require("express");
const router = express.Router();

// Import auth module
const AuthPolicy = require("../policies/authPolicy");
const AuthController = require("../controllers/authController");

// Setup routes
module.exports = () => {
  // AUTH: TEST Route (GET ALL)
  router.get("/users", AuthController.listUsers);

  // AUTH: REGISTER (POST) Route
  router.post("/register", AuthPolicy.validateAuth, AuthController.register);

  // AUTH: LOGIN (POST) Route
  router.post("/login", AuthPolicy.validateAuth, AuthController.login);

  return router;
};
