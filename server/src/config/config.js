module.exports = {
  // [A] PORT SETTINGS
  port: process.env.PORT || 5000,

  // [B] DATABASE SETTINGS
  db: {
    serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    serviceAccountKeyProd: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROD,
    storageBucket: process.env.STORAGE_BUCKET_URL,
  },

  // [C] AUTH ENV
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },

  // [D] Approved CORS rool URLs
  corsAllowedOptions: [
    process.env.CORS_WHITELIST_DEV,
    process.env.CORS_WHITELIST_PROD,
  ],
};
