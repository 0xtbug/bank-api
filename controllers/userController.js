const { User } = require('../models');

exports.updateProfile = async (req, res) => {
  const userId = req.user.userId; // Mengambil userId dari JWT
  const { first_name, last_name, address } = req.body;

  try {
    // Temukan user berdasarkan ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profil pengguna
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.address = address || user.address;
    await user.save();

    // Respon sukses
    res.status(200).json({
      status: 'SUCCESS',
      result: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        updated_date: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
