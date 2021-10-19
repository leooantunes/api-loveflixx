const mongoose = require("../database");

const drinkchema = new mongoose.Schema({
  drink: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Drink = mongoose.model("Drink", drinkchema);

module.exports = Drink;
