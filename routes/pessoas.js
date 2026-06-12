const express = require("express");
const router = express.Router();
const Pessoa = require("../models/pessoaModel");
const { Op, fn, col } = require("sequelize");
const sequelize = require("../databaseConnection"); // ✅ corrigido

// GET todas as pessoas
router.get("/", async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    console.error("Erro ao buscar pessoas:", error);
    res.status(500).json({ error: "Erro ao buscar pessoas" });
  }
});

// GET aniversariantes de hoje
router.get("/hoje", async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Erro ao buscar aniversariantes de hoje:", error);
    res.status(500).json({ error: "Erro ao buscar aniversariantes de hoje" });
  }
});

// POST cadastrar pessoa
router.post("/", async (req, res) => {
  try {
    const pessoa = await Pessoa.create(req.body);
    res.status(201).json(pessoa);
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
    res.status(500).json({ error: "Erro ao cadastrar pessoa" });
  }
});

// PUT editar pessoa
router.put("/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ error: "Pessoa não encontrada" });

    await pessoa.update(req.body);
    res.json(pessoa);
  } catch (error) {
    console.error("Erro ao editar pessoa:", error);
    res.status(500).json({ error: "Erro ao editar pessoa" });
  }
});

// PUT confirmar lembrete
router.put("/confirmar/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ erro: "Pessoa não encontrada" });

    pessoa.Confirmado = true;
    await pessoa.save();
    res.json({ mensagem: "Lembrete confirmado com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// DELETE excluir pessoa
router.delete("/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ error: "Pessoa não encontrada" });

    await pessoa.destroy();
    res.json({ message: "Pessoa excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
    res.status(500).json({ error: "Erro ao excluir pessoa" });
  }
});

module.exports = router;
