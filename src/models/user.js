const mongoose = require("../database");
const bcript = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcript.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
