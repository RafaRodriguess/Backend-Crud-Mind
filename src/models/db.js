const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("", "", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Conexão com o banco realizada com sucesso!");
  })
  .catch(function () {
    console.log("erro: conexão nao realizada!");
  });

module.exports = sequelize;
