const transactionRouter = require("express").Router();
const {
  createOrder,
  allTransaction,
  transactionId,
  deleteTransactionId,
  updateTransactionId,
  createTransactionId,
  historyId,
} = require("../controllers/transaction.controller");

// transactionRouter.get('/', allTransaction)
transactionRouter.get("/history", transactionId);
transactionRouter.get("/history/:id", historyId);
transactionRouter.post("/", createTransactionId);
transactionRouter.post("/order", createOrder);
transactionRouter.delete("/:id", deleteTransactionId);
transactionRouter.patch("/:id", updateTransactionId);

module.exports = transactionRouter;
