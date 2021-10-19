const express = require("express");
const middle = require("../middle/auth");
const router = express.Router();

const Movie = require("../models/movie");

router.use(middle);

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.send({ movies });
  } catch (error) {
    return res.status(400).send({ error: "Não existem filmes cadastrados" });
  }
});

router.post("/movie", async (req, res) => {
  try {
    const movie = await Movie.create({ ...req.body, user: req.userId });
    return res.send({ movie });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Não foi possivel cadastrar seu filme" });
  }
});

router.delete("/:movieId", async (req, res) => {
  try {
    await Movie.findByIdAndRemove(req.params.movieId);
    res.send();
  } catch (error) {
    return res.status(400).send({ error: "Não foi possivel excluir o filme" });
  }
});

module.exports = (app) => app.use("/movies", router);
