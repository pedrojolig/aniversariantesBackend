const express = require("express");
const router = express.Router();
const Pessoa = require("../models/pessoaModel");

// GET todas as pessoas
router.get("/", async (req, res) => {
  const pessoas = await Pessoa.findAll();
  res.json(pessoas);
});

// POST cadastrar pessoa
router.post("/", async (req, res) => {
  try {
    const pessoa = await Pessoa.create(req.body);
    res.status(201).json(pessoa);
  } catch (err) {
    res.status(400).json({ erro: err.message });
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

module.exports = router;
