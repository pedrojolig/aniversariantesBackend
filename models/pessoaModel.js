const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConnection");

const Pessoa = sequelize.define("Pessoa", {
  Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Nome: { type: DataTypes.STRING(100), allowNull: false },
  DataNascimento: { type: DataTypes.DATEONLY, allowNull: false },
  Grupo: { type: DataTypes.INTEGER, allowNull: false },
  Presente: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: "pessoas",
  timestamps: false
});

module.exports = Pessoa;
