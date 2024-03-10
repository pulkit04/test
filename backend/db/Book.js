const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
  title: String,
  url: String,
  author: String,
  published_date: Date,
  category: String,
});

module.exports = mongoose.model("Book", bookSchema);


