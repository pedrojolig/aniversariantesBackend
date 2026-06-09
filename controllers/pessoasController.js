const express = require("express");
const router = express.Router();
const Pessoa = require("../models/pessoaModel");
const { Op, fn, col } = require("sequelize");
const sequelize = require("../databaseConnection");

// GET todas as pessoas
router.get("/", async (req, res) => {
  const pessoas = await Pessoa.findAll();
  res.json(pessoas);
});

// GET aniversariantes de hoje
router.get("/hoje", async (req, res) => {
  const hoje = new Date();
  const pessoas = await Pessoa.findAll({
    where: {
      [Op.and]: [
        sequelize.where(fn("DAY", col("DataNascimento")), hoje.getDate()),
        sequelize.where(fn("MONTH", col("DataNascimento")), hoje.getMonth() + 1)
      ]
    }
  });
  res.json(pessoas);
});

// POST cadastrar pessoa
router.post("/", async (req, res) => {
  const pessoa = await Pessoa.create(req.body);
  res.status(201).json(pessoa);
});

module.exports = router;
