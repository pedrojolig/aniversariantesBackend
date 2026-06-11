const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("aniversario", "root", "digitesuasenhaaqui", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00"
});

module.exports = sequelize;
