const {
  modelAllTransaction,
  modelTransactionId,
  modelDeleteTransactionId,
  modelUpdateTransaction,
  modelCreateTransaction,
  selectCountAllTransaction,
  modelCreateOrder,
  modelHistoryById,
} = require("../models/transaction.model");
const errorHandler = require("../helpers/errorHandler.helper");
const filter = require("../helpers/filter.helper");
const jwt = require("jsonwebtoken");

const allTransaction = (req, res) => {
  const sortable = [
    "bookingDate",
    "fullName",
    "email",
    "phoneNumber",
    "createdAt",
    "updateAt",
  ];
  filter(
    req.query,
    sortable,
    selectCountAllTransaction,
    res,
    (filter, pageInfo) => {
      modelAllTransaction(filter, (err, data) => {
        if (err) {
          return errorHandler(err, res);
        }
        return res.status(200).json({
          success: true,
          message: "Data Transactions success loaded",
          pageInfo,
          results: data.rows,
        });
      });
    }
  );
};

const transactionId = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const validated = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = validated;
  console.log(id);
  modelTransactionId(id, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "ID Data Transaction success",
      results: data.rows,
    });
  });
};

const deleteTransactionId = (req, res) => {
  modelDeleteTransactionId(req.params, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Transaction ID deleted",
      results: data.rows[0],
    });
  });
};

const updateTransactionId = (req, res) => {
  modelUpdateTransaction(req.body, req.params.id, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Transaction ID has been updated",
      results: data.rows[0],
    });
  });
};

const createTransactionId = (req, res) => {
  modelCreateTransaction(req.body, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Create Transaction ID success",
      results: data.rows[0],
    });
  });
};

const createOrder = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const validated = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = validated;
  const transaction = {
    userId: id,
    bookingDate: req.body.bookingDate,
    movieId: req.body.movieId,
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    statusId: req.body.statusId,
    paymentId: req.body.paymentId,
    seatNum: req.body.seatNum,
    cinemaId: req.body.cinemaId,
    movieScheduleId: req.body.movieScheduleId,
    time: req.body.time,
    totalPrice: req.body.totalPrice,
  };
  modelCreateOrder(transaction, (err, result) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Create order success",
      result: result,
    });
  });
};

const historyId = async (req, res) => {
  try {
    const historyUser = await modelHistoryById(req.params);
    return res.status(200).json({
      success: true,
      message: "History ID Success",
      results: historyUser[0],
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  allTransaction,
  transactionId,
  deleteTransactionId,
  updateTransactionId,
  createTransactionId,
  createOrder,
  historyId,
};
