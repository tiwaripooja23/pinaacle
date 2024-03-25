const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  let transactionSchema = new Schema({
    accountNumber: {
      type: String
    },
    balance: {
      type: Number
    },
    customerId: {
      type: Number
    },
    transactions : [{
      amount: {
        type: Number
      },
      note: {
        type: String
      },
      date: {
        type: Date
      }
    }]
   
  }, {
      collection: 'transaction'
    })

module.exports = mongoose.model('Transaction', transactionSchema)
