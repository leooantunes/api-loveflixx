const tokenJWT = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).send({ error: "Não existe token" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).send({ error: "O token não é bearer" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token não formatado" });

  tokenJWT.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "token inválido" });
    req.userId = decoded.id;
    return next();
  });
};
