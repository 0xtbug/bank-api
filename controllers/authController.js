const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 

// Fungsi untuk registrasi pengguna baru
exports.register = async (req, res) => {
  const { first_name, last_name, phone_number, address, pin } = req.body;

  // Validasi input
  if (!first_name || !last_name || !phone_number || !address || !pin) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Cek apakah nomor telepon sudah terdaftar
    const existingUser = await User.findOne({ where: { phone_number } });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone Number already registered' });
    }

    // Hash PIN
    const hashedPin = await bcrypt.hash(pin, 10);

    // Buat user baru
    const user = await User.create({
      user_id: uuidv4(),
      first_name,
      last_name,
      phone_number,
      address,
      pin: hashedPin,
    });

    res.status(201).json({
      status: 'SUCCESS',
      result: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        address: user.address,
        created_date: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk login pengguna
exports.login = async (req, res) => {
  const { phone_number, pin } = req.body;

  // Validasi input
  if (!phone_number || !pin) {
    return res.status(400).json({ message: 'Phone number and pin are required' });
  }

  try {
    // Cek apakah user dengan phone_number ada
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      return res.status(400).json({ message: "Phone number and pin doesn't match." });
    }

    // Verifikasi PIN
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(400).json({ message: "Phone number and pin doesn't match." });
    }

    // Generate access_token dan refresh_token
    const access_token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
    const refresh_token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      status: 'SUCCESS',
      result: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
