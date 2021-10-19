const mongoose = require("../database");

const dessertSchema = new mongoose.Schema({
  dessert: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Dessert = mongoose.model("Dessert", dessertSchema);

module.exports = Dessert;
