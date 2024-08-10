const { User, Transaction } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.topup = async (req, res) => {
  const userId = req.user.userId; // Mengambil userId dari JWT
  const { amount } = req.body;

  try {
    // Temukan user berdasarkan ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ambil saldo sebelum top-up, saldo awal disetel ke 0 jika belum pernah ada transaksi
    const balanceBefore = user.balance || 0;
    const balanceAfter = balanceBefore + amount;

    // Update saldo pengguna
    user.balance = balanceAfter;
    await user.save();

    // Buat catatan transaksi
    const transaction = await Transaction.create({
      top_up_id: uuidv4(),
      user_id: user.user_id,
      transaction_type: 'CREDIT', // Set transaction type to CREDIT
      amount: amount,
      balance_before: balanceBefore,
      balance_after: balanceAfter,
    });

    // Respon sukses
    res.status(200).json({
      status: 'SUCCESS',
      result: {
        top_up_id: transaction.top_up_id,
        amount_top_up: transaction.amount_top_up,
        balance_before: transaction.balance_before,
        balance_after: transaction.balance_after,
        created_date: transaction.createdAt,
      },
    });
  } catch (error) {
    console.error('Topup Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
