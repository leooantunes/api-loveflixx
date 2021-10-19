const express = require("express");
const middle = require("../middle/auth");
const router = express.Router();

const Dessert = require("../models/dessert");

router.use(middle);

router.get("/desserts", async (req, res) => {
  try {
    const desserts = await Dessert.find();
    return res.send({ desserts });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Não existem sobremesas cadastradas" });
  }
});

router.post("/dessert", async (req, res) => {
  try {
    const dessert = await Dessert.create({ ...req.body, user: req.userId });
    return res.send({ dessert });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Não foi possivel cadastrar sua sobremesa" });
  }
});

router.delete("/:dessertId", async (req, res) => {
  try {
    await Dessert.findByIdAndRemove(req.params.dessertId);
    res.send();
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Não foi possivel excluir a sobremesa" });
  }
});

module.exports = (app) => app.use("/desserts", router);
