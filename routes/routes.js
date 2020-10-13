"use strict";

const express = require("express");
const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const authenticateUser = require('../utils/authenticateUser')
const { User } = require("../models/");


// GET /api/users 200 - Returns the currently authenticated user
router.get(
    "/users",authenticateUser,
    asyncHandler(async (req, res) => {      

        const currentUser = await req.currentUser;

        // if a users exist
        if (currentUser) {
        const user = await User.findByPk(currentUser.id, {
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        });
        console.log(user);
        res.location("/").json(user);
        }
    })
  );
  // POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
  router.post(
    "/users", 
    asyncHandler(async (req, res) => {
      const userData = req.body;
      console.log(userData);

    })
  );
  
  // GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
  router.get(
    "/courses",
    asyncHandler(async (req, res) => {})
  );
  
  // GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
  router.get(
    "/courses/:id",
    asyncHandler(async (req, res) => {})
  );
  
  // POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
  router.post(
    "/courses",
    asyncHandler(async (req, res) => {})
  );
  
  // PUT /api/courses/:id 204 - Updates a course and returns no content
  router.put(
    "/courses/:id",
    asyncHandler(async (req, res) => {})
  );
  
  // DELETE /api/courses/:id 204 - Deletes a course and returns no content
  router.delete(
    "/courses/:id",
    asyncHandler(async (req, res) => {})
  );

  module.exports = router;