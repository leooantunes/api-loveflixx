const express = require("express");
const middle = require("../middle/auth");
const router = express.Router();

const Drink = require("../models/drink");

router.use(middle);

router.get("/drinks", async (req, res) => {
  try {
    const drinks = await Drink.find();
    return res.send({ drinks });
  } catch (error) {
    return res.status(400).send({ error: "Não existem bebidas cadastradas" });
  }
});

router.post("/drink", async (req, res) => {
  try {
    const drink = await Drink.create({ ...req.body, user: req.userId });
    return res.send({ drink });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Não foi possivel cadastrar sua bebida" });
  }
});

router.delete("/:drinkId", async (req, res) => {
  try {
    await Drink.findByIdAndRemove(req.params.drinkId);
    res.send();
  } catch (error) {
    return res.status(400).send({ error: "Não foi possivel excluir a bebida" });
  }
});

module.exports = (app) => app.use("/drinks", router);
