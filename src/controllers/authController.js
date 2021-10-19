const express = require("express");
const bcrypt = require("bcrypt");
const tokenJWT = require("jsonwebtoken");
const authConfig = require("../config/auth");
const User = require("../models/user");

const router = express.Router();

function generateToken(params = {}) {
  return tokenJWT.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/register", async (req, res) => {
  const { name } = req.body;

  try {
    if (await User.findOne({ name })) {
      return res.status(400).send({ error: "Usuário já existe" });
    }
    const user = await User.create(req.body);
    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: "Resgistro Failure" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "Usuário não encontrado" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "senha incorreta" });
  }

  res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = (app) => app.use("/auth", router);
