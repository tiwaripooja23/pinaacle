const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  let transactionSchema = new Schema({
    accountNUmver: {
      type: String
    },
    amount: {
      type: Number
    },
    mode: {
      type: Number
    },
    balance: {
      type: Number
    },
    date: {
      type: Date
    },
    customerId: {
      type: Number
    }
  }, {
      collection: 'transaction'
    })

module.exports = mongoose.model('Customer', transactionSchema)
