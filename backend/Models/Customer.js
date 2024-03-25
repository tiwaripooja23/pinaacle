const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  ssn: {
    type: Number
  },
  accountNumber: {
    type: Number
  },
  balance: {
    type: Number
  },
  transaction: {
    type: Number
  },
  pwds: {
    type: String
  }
}, {
    collection: 'customer'
  })


module.exports = mongoose.model('Customer', customerSchema)