const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

// Import custom modules
const config = require("./config/config");
const corsOptions = require("./config/corsOptions");
const { dbPing } = require("./config/db");
const ApiError = require("./utilities/ApiError");
const apiErrorHandler = require("./middleware/apiErrorHandler");

// Import root debug
const debugStartup = require("debug")("app:startup");
// Initialise app using express
const app = express();

// Import central routes
const routes = require("./routes/routes");

// HTTP Header-setter security
app.use(helmet());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
debugStartup("CORS Pre-flight requests enabled for whitelist origins");

// Express middleware
app.use(express.json());

// Middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
debugStartup("Parsing middleware enabled on all routes");

// File parsing middleware
app.use(fileUpload({ createParentPath: true }));

// Cycle through requests through morgan to track our queries
app.use(morgan("dev"));

// Main routes file
app.use("/api", routes());

app.use((req, res, next) => {
  // Not Found Middleware
  next(ApiError.notFound());
});

app.use(apiErrorHandler);

// Set server PORT
dbPing.then(() => {
  const PORT = config.port;
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
});
