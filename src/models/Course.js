const Sequelize = require("sequelize");
const db = require("./db");

const Course = db.define("courses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    require: true,
  },
  teacher: {
    type: Sequelize.STRING,
    require: true,
  },
  category: {
    type: Sequelize.STRING,
    require: true,
  },
  description: {
    type: Sequelize.STRING,
    require: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  image: {
    type: Sequelize.STRING,
  },
});

module.exports = Course;

//Se nao existir a tabela, criar tabela
// Course.sync();

// Course.sync({ alter: true });
