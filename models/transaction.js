module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Transaction', {
      transaction_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      transaction_type: {
        type: DataTypes.STRING, // 'CREDIT' atau 'DEBIT'
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      balance_before: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      balance_after: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'transactions',
    });
  };
  