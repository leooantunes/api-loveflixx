const mongoose = require("../database");

const foodSchema = new mongoose.Schema({
  food: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
