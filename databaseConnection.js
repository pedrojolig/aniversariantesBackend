const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("aniversario", "root", "SUA_SENHA_AQUI", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
