const mongoose = require("../database");

const movieSchema = new mongoose.Schema({
  movie: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
