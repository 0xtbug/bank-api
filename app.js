const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(transactionRoutes);

sequelize.sync().then(() => {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
