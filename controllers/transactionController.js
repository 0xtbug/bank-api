const { Payment, Topup, Transfer, sequelize } = require('../models');

exports.getTransactions = async (req, res) => {
  const userId = req.user.userId; // Mengambil userId dari JWT

  try {
    // Ambil semua data dari tabel Payment, TopUp, dan Transfer
    const payments = await Payment.findAll({
      where: { user_id: userId },
      attributes: [
        ['payment_id', 'transaction_id'],
        'payment_id',
        'user_id',
        'amount',
        'remarks',
        'balance_before',
        'balance_after',
        'createdAt',
        [sequelize.literal('"DEBIT"'), 'transaction_type'], // Set transaction type
      ],
    });

    const topups = await Topup.findAll({
      where: { user_id: userId },
      attributes: [
        ['top_up_id', 'transaction_id'],
        'top_up_id',
        'user_id',
        'amount',
        [sequelize.literal('NULL'), 'remarks'], // No remarks for topups
        'balance_before',
        'balance_after',
        'createdAt',
        [sequelize.literal('"CREDIT"'), 'transaction_type'], // Set transaction type
      ],
    });

    const transfers = await Transfer.findAll({
      where: { sender_id: userId },
      attributes: [
        ['transfer_id', 'transaction_id'],
        'transfer_id',
        [sequelize.col('sender_id'), 'user_id'], // Proper aliasing in Sequelize
        'amount',
        'remarks',
        'balance_before',
        'balance_after',
        'createdAt',
        [sequelize.literal('"DEBIT"'), 'transaction_type'], // Set transaction type
      ],
    });

    // Gabungkan semua transaksi
    const transactions = [...payments, ...topups, ...transfers];

    // Urutkan berdasarkan tanggal pembuatan (createdAt)
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const result = transactions.map(transaction => ({
      transaction_id: transaction.transaction_id,
      payment_id: transaction.payment_id || null,
      top_up_id: transaction.top_up_id || null,
      transfer_id: transaction.transfer_id || null,
      user_id: transaction.user_id,
      status: 'SUCCESS',
      transaction_type: transaction.transaction_type,
      amount: transaction.amount,
      remarks: transaction.remarks,
      balance_before: transaction.balance_before,
      balance_after: transaction.balance_after,
      created_date: transaction.createdAt, 
    }));

    res.status(200).json({
      status: 'SUCCESS',
      result: result,
    });
  } catch (error) {
    console.error('Get Transactions Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
