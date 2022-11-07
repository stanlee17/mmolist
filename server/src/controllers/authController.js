const { db } = require("../config/db");
const ApiError = require("../utilities/ApiError");
const {
  findUser,
  hashPassword,
  userDetailsToJSON,
  jwtSignUser,
  comparePassword,
} = require("../utilities/authServices");

// Import debug logs
const debugAuth = require("debug")("app:auth");

module.exports = {
  // [1] GET ALL USERS
  async listUsers(req, res, next) {
    // Store the document query in variable & call GET method
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    // [400 ERROR] Check for users asking for non-existent docs
    if (snapshot.empty) {
      return next(
        ApiError.badRequest("The users you were looking for do not exist")
      );
      // SUCCESS: Push object properties to array & send to client
    } else {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          isAdmin: doc.data().isAdmin,
        });
      });
      res.send(users);
    }
  },

  // [2] REGISTER USER
  async register(req, res, next) {
    try {
      // Destructuring
      debugAuth(req.body);
      debugAuth(
        `Status of x-auth-token Header: ${req.headers["x-auth-token"]}`
      );
      const { username, email, password } = req.body;

      // Validation: Block matching emails in the DB
      const userMatch = await findUser(email);
      debugAuth(userMatch);

      if (userMatch.length >= 1) {
        return next(ApiError.badRequest("This email is already in use"));
      }

      // Save new user to the database
      const usersRef = db.collection("users");
      const response = await usersRef.add({
        username: username,
        email: email,
        password: await hashPassword(password),
        isAdmin: false,
      });
      debugAuth(`Success - User ${response.id} registered!`);

      // Convert user details to JSON
      const userJSON = await userDetailsToJSON(response.id);
      debugAuth(userJSON);

      // Mint our token + return the user object as response
      res.send({
        token: jwtSignUser(userJSON),
      });
    } catch (err) {
      return next(
        ApiError.internal("Your user profile could not be registered", err)
      );
    }
  },

  async login(req, res, next) {
    try {
      // Destructure
      debugAuth(req.body);
      debugAuth(
        `Status of x-auth-token Header: ${req.headers["x-auth-token"]}`
      );
      const { email, password } = req.body;

      // Validation: Check for email match
      const userMatch = await findUser(email);

      if (userMatch.length === 0) {
        return next(
          ApiError.badRequest("The credentials entered are not correct")
        );
      }

      // Validation: Block non-matching passwords
      const passwordMatch = await comparePassword(userMatch, password);

      if (!passwordMatch) {
        return next(
          ApiError.badRequest("The credentials entered are not correct")
        );
      }

      // Confirm the login & convert user details to JSON
      debugAuth(`Success - User: ${userMatch[0].id} is logged in!`);
      const userJSON = await userDetailsToJSON(userMatch[0].id);

      // Return User object + token
      res.send({
        token: jwtSignUser(userJSON),
      });
    } catch (err) {
      return next(
        ApiError.internal(
          "Your user profile cannot be logged into at this time",
          err
        )
      );
    }
  },
};
