"use strict";

const express = require("express");
const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const authenticateUser = require("../utils/authenticateUser");
const { User, Course } = require("../models/");

// GET /api/users 200 - Returns the currently authenticated user
router.get(
  "/users",
  asyncHandler(async (req, res) => {
    res.json({ currentUser: "IN CONSTRUCTION" });
  })
);
// POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress, password } = req.body;
    const userExist = await User.findOne({
      where: {
        emailAddress: emailAddress,
        firstName: firstName,
        lastName: lastName,
        password: password,
      },
    });
    if (userExist) {
      res.json({ error: "User already exist", user: userExist });
    } else {
      await User.create({
        emailAddress: emailAddress,
        firstName: firstName,
        lastName: lastName,
        password: password,
      });
      res.location("/").json({});
    }
  })
);

// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  })
);

// GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByPk(id, {
      include: [{ model: User }],
    });
    res.status(200).json(course);
  })
);

// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post(
  "/courses",
  asyncHandler(async (req, res) => {
    const { title, description, estimatedTime, materialsNeeded, userId } =
      req.body;
    const courseExist = await Course.findOne({
      where: {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId,
      },
    });

    if (courseExist) {
      res.json({ error: "Course already exist", course: courseExist });
    } else {
      await Course.create({
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId,
      });
      res.location("/").json({});
    }
  })
);

// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, estimatedTime, materialsNeeded, userId } =
      req.body;
    await Course.update(
      {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId,
      },
      { where: { id } }
    );
    res.json({});
  })
);

// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteCourse = await Course.destroy({ where: { id } });
    console.log(deleteCourse);
    res.json({});
  })
);

module.exports = router;
