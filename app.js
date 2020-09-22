"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const { Course } = require("./models");

// Testing the connection to sqlite
const sequelize = new Sequelize("sqlite::memory:");
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// GET /api/users 200 - Returns the currently authenticated user
app.get(
  "/api/users",
  asyncHandler(async (req, res) => {})
);
// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
app.post(
  "/api/users",
  asyncHandler(async (req, res) => {})
);

// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
app.get(
  "/api/courses",
  asyncHandler(async (req, res) => {})
);

// GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
app.get(
  "/api/courses/:id",
  asyncHandler(async (req, res) => {})
);

// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
app.post(
  "/api/courses",
  asyncHandler(async (req, res) => {})
);

// PUT /api/courses/:id 204 - Updates a course and returns no content
app.put(
  "/api/courses/:id",
  asyncHandler(async (req, res) => {})
);

// DELETE /api/courses/:id 204 - Deletes a course and returns no content
app.delete(
  "/api/courses/:id",
  asyncHandler(async (req, res) => {})
);
// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
