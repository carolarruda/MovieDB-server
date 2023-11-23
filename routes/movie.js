const { createMovie, getMovies } = require("../domain/movie");
const express = require("express");
const authenticateToken = require("../utils/auth");
const router = express.Router();

router.post("/", authenticateToken, createMovie);
router.get("/", getMovies);

module.exports = router;
