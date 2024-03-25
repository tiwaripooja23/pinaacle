let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Model
let customerSchema = require("../Models/Customer");
let transactionSchema = require("../Models/Transaction")

// CREATE user
router.route("/create-customer").post(async (req, res, next) => {
  await customerSchema
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// READ user
router.route("/").get(async (req, res, next) => {
  await customerSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Get Single user
router.route("/get-customer/:id").get(async (req, res, next) => {
  await customerSchema
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Update user
router.route("/update-customer/:id").put(async (req, res, next) => {
  await customerSchema
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete user
router.route("/delete-customer/:id").delete(async (req, res, next) => {
  await customerSchema
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get-transactions/:id").get(async (req, res, next) => {
  let customer = await customerSchema.findById(req.params.id);
  let accountNumber = customer.accountNumber;
  await transactionSchema.findOne({ accountNumber })
    .then((result) => {
      res.json({
        data: result && result.transactions,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Deposit endpoint
router.route("/deposit/:id").post(async (req, res, next) => {
  const { accountNumber, amount, note } = req.body;

  try {
      // Find customer by id
      let payer = await customerSchema.findById(req.params.id);
      let receiver = await customerSchema.findOne({accountNumber});
      let payerAccountNumber = payer.accountNumber;

      if (!payer) {
          return res.status(404).json({ message: 'Payer not found' });
      }
      if (!receiver) {
        return res.status(404).json({ message: 'Receiver not found' });
    }

      // Update balance
      payer.balance =  parseFloat(payer.balance) - parseFloat(amount);
      await payer.save();
      receiver.balance =  parseFloat(receiver.balance) + parseFloat(amount);
      await receiver.save();
      // Find existing transaction
      let payerTransaction = await transactionSchema.findOne({ accountNumber : payerAccountNumber });
      let receiverTransaction = await transactionSchema.findOne({ accountNumber });

      if (payerTransaction) {
          // Update existing transaction
          payerTransaction.transactions.push({ amount: parseFloat(amount) * -1, note: note, date: new Date() });
          await payerTransaction.save();
      } else {

          transaction = new transactionSchema({
              accountNumber: payerAccountNumber,
              balance: payer.balance,
              transactions: [{ amount: parseFloat(amount) * -1, note: note, date: new Date() }]
        });
        await transaction.save();
      }

      if (receiverTransaction) {
        receiverTransaction.transactions.push({ amount: parseFloat(amount), note: note, date: new Date() });
        await receiverTransaction.save();
    } else {
        transaction = new transactionSchema({
            accountNumber,
            balance: receiver.balance,
            transactions: [{ amount: parseFloat(amount), note: note, date: new Date() }]
      });
      await transaction.save();
    }

      

      res.status(200).json({ message: 'Deposit successful'});
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Withdrawal endpoint
/*router.route("/withdrawal/:id").post(async (req, res, next) => {
  const { accountNumber, password, amount, note } = req.body;

  try {
      // Find customer by id
      let customer = await Customer.findById(req.params.id);

      if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
      }

      // Validate account number and password
      if (customer.accountNumber !== accountNumber || customer.pwds !== password) {
          return res.status(401).json({ message: 'Invalid account number or password' });
      }

      // Check if sufficient balance is available
      if (customer.balance < amount) {
          return res.status(400).json({ message: 'Insufficient balance' });
      }

      // Update balance
      customer.balance -= amount;
      await customer.save();

      // Find existing transaction
      let transaction = await transactionSchema.findOne({ accountNumber });

      if (transaction) {
          // Update existing transaction
          transaction.transactions.push({ amount: -amount, Note: note, date: new Date() });
          await transaction.save();
      } else {
          // Create new transaction
          transaction = new transactionSchema({
              accountNumber,
              balance: customer.balance,
              transactions: [{ amount: -amount, Note: note, date: new Date() }]
          });
          await transaction.save();
      }

      res.status(200).json({ message: 'Withdrawal successful', balance: customer.balance });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});*/




module.exports = router;
