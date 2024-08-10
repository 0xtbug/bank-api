const { User, Payment } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.pay = async (req, res) => {
  const userId = req.user.userId;
  const { amount, remarks } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Balance is not enough' });
    }

    const balanceBefore = user.balance;
    const balanceAfter = balanceBefore - amount;

    user.balance = balanceAfter;
    await user.save();

    const payment = await Payment.create({
      payment_id: uuidv4(),
      user_id: user.user_id,
      transaction_type: 'DEBIT', // Set transaction type to DEBIT
      amount: amount,
      remarks: remarks,
      balance_before: balanceBefore,
      balance_after: balanceAfter,
    });

    // Respon sukses
    res.status(200).json({
      status: 'SUCCESS',
      result: {
        payment_id: payment.payment_id,
        amount: payment.amount,
        remarks: payment.remarks,
        balance_before: payment.balance_before,
        balance_after: payment.balance_after,
        created_date: payment.createdAt,
      },
    });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
