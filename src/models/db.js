const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("dbmind", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

//apresentar a msg se estiver em desenvolvimento
//nao mostrar ao usuario esta mensagem
sequelize
  .authenticate()
  .then(function () {
    console.log("Conexão com o banco realizada com sucesso!");
  })
  .catch(function () {
    console.log("erro: conexão nao realizada!");
  });

module.exports = sequelize;
