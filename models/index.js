const Sequelize = require("sequelize");
const sequelize = require("../config/config");

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Topup = require("./topup")(sequelize, Sequelize.DataTypes);
const Payment = require("./payment")(sequelize, Sequelize.DataTypes);
const Transfer = require("./transfer")(
  sequelize,
  Sequelize.DataTypes
);

sequelize.sync();

module.exports = {
  User,
  Topup,
  Payment,
  Transfer,
  sequelize,
};
