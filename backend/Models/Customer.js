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

module.exports = mongoose.model('Customer', customerSchema)