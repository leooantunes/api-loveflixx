const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://leooantunes:loveflix123456@api-loveflix.tlshy.mongodb.net/loveflix?retryWrites=true&w=majority"
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
