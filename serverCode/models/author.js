const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
})

module.exports = mongoose.model('Author', authorSchema); //name, what the objects will be structured based on.
