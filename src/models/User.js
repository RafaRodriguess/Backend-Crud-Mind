const Sequelize = require("sequelize");
const db = require("./db");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = User;

//Se nao existir a tabela, criar tabela
// User.sync();

// User.sync({ alter: true });
