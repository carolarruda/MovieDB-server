const Movie = require("../models/movie");
const User = require("../models/user")

const createMovie = async (req, res) => {
  const { title, description, runtimeMins, url } = req.body;

  const loggedUserId = req.user.userId

  try {

    if (!title) {
      return res.status(400).json({
        error: "Missing fields in request body",
      });
    }
    const existingMovie = await Movie.findOne({ title });

    if (existingMovie) {
      return res
        .status(409)
        .json({ errors: ["Movie is already in your database"] });
    }

    const movie = new Movie({
      title,
      description,
      runtimeMins,
      url,
    });


    const user = await User.findById(loggedUserId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newMovie = await movie.save();
    user.movies.push(newMovie);
    await user.save();

    res.status(200).json({
      newMovie: {
        title: newMovie.title,
        description: newMovie.description,
        runtimeMins: newMovie.runtimeMins,
        url: newMovie.url,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const loggedUserId = req.user.userId;

    const foundUser = await User.findById(loggedUserId).populate('movies');

    if (!foundUser) {
      return res.status(404).json({ errors: ["User not found"] });
    }

    const userMovies = foundUser.movies;
    console.log('movies', userMovies);

    if (!userMovies || userMovies.length === 0) {
      return res
        .status(404)
        .json({ errors: ["No movies found for this user"] });
    }

    res.status(200).json(userMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMovie, getMovies };
