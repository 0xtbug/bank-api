const express = require('express');
const router = express.Router();
const topupController = require('../controllers/topupController');
const paymentController = require('../controllers/paymentController');
const transferController = require('../controllers/transferController');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/topup', authMiddleware, topupController.topup);
router.post('/pay', authMiddleware, paymentController.pay);
router.post('/transfer', authMiddleware, transferController.transfer);
router.get('/transactions', authMiddleware, transactionController.getTransactions);

module.exports = router;