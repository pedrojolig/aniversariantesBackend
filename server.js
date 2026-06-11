const express = require("express");
const cors = require("cors");
const sequelize = require("./databaseConnection");
const pessoasController = require("./controllers/pessoasController");
const { enviarLembretes } = require("./lembreteService");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/pessoas", pessoasController);

// rota de teste para disparar e-mails manualmente
app.get("/api/testar-lembretes", async (req, res) => {
  try {
    await enviarLembretes();
    res.json({ mensagem: "Lembretes enviados com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

sequelize.authenticate().then(() => {
  console.log("Conectado ao banco!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
