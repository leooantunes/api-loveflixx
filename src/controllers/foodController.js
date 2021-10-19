const express = require("express");
const middle = require("../middle/auth");
const router = express.Router();

const Food = require("../models/food");

router.use(middle);

router.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    return res.send({ foods });
  } catch (error) {
    return res.status(400).send({ error: "Não existem comidas cadastradas" });
  }
});

router.post("/food", async (req, res) => {
  try {
    const food = await Food.create({ ...req.body, user: req.userId });
    return res.send({ food });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Não foi possivel cadastrar sua comida" });
  }
});

router.delete("/:foodId", async (req, res) => {
  try {
    await Food.findByIdAndRemove(req.params.foodId);
    res.send();
  } catch (error) {
    return res.status(400).send({ error: "Não foi possivel excluir a comida" });
  }
});

module.exports = (app) => app.use("/foods", router);
