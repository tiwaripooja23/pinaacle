let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let customerSchema = require("../Models/Customer");

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
module.exports = router;
