const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatSchema = new Schema({
  message: {
    type: String
  },
  email: {
    type: String
  },
  id: {
    type: Number
  }
}, {
    collection: 'chat'
  })

module.exports = mongoose.model('Customer', chatSchema)
