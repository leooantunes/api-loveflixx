const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/foodController")(app);
require("./controllers/dessertController")(app);
require("./controllers/drinkController")(app);
require("./controllers/movieController")(app);

app.listen(process.env.PORT || 3000);
