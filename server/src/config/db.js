// Import of admin SDK libraries
const admin = require("firebase-admin");
const config = require("./config");
const serviceAccount = require(config.db.serviceAccountKey);

// Import debug logs
const dbStartup = require("debug")("app:db");
const debugError500 = require("debug")("app:error500");

try {
  // DEBUG: Notify connection start
  dbStartup("Attempting database connection...");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.db.storageBucket,
  });

  // DEBUG: Notify connection complete
  dbStartup("Connected to the database");

  // Storing core database functions in variables
  const db = admin.firestore();
  const bucket = admin.storage().bucket();

  // Testing: DB Ping function
  const dbPing = db.listCollections().then((collections) => {
    for (let collection of collections) {
      dbStartup(`Found db collection: ${collection.id}`);
    }
  });

  // Export database variable methods for use in our application
  module.exports = { db, bucket, dbPing };
} catch (err) {
  debugError500(err);
}
