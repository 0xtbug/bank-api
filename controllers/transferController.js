const { User, Transfer } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.transfer = async (req, res) => {
  const senderId = req.user.userId; // ID pengirim dari JWT
  const { target_user, amount, remarks } = req.body;

  try {
    // Temukan pengguna pengirim dan penerima
    const sender = await User.findByPk(senderId);
    const receiver = await User.findByPk(target_user);

    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Cek apakah saldo cukup untuk melakukan transfer
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Balance is not enough' });
    }

    // Hitung saldo sebelum dan sesudah transfer
    const balanceBefore = sender.balance;
    const balanceAfter = balanceBefore - amount;

    // Update saldo pengguna pengirim
    sender.balance = balanceAfter;
    await sender.save();

    // Tambahkan saldo ke penerima
    receiver.balance += amount;
    await receiver.save();

    // Catat transaksi transfer
    const transfer = await Transfer.create({
      transfer_id: uuidv4(),
      sender_id: sender.user_id,
      receiver_id: receiver.user_id,
      amount: amount,
      transaction_type: 'DEBIT', // Set transaction type to DEBIT
      remarks: remarks,
      balance_before: balanceBefore,
      balance_after: balanceAfter,
    });

    // Respon sukses
    res.status(200).json({
      status: 'SUCCESS',
      result: {
        transfer_id: transfer.transfer_id,
        amount: transfer.amount,
        remarks: transfer.remarks,
        balance_before: transfer.balance_before,
        balance_after: transfer.balance_after,
        created_date: transfer.createdAt,
      },
    });
  } catch (error) {
    console.error('Transfer Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
