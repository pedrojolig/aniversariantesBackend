const express = require("express");
const cors = require("cors");
const sequelize = require("./databaseConnection"); // ✅ corrigido para o nome certo
const pessoasRoutes = require("./routes/pessoas");
const { enviarLembretes } = require("./lembreteService");

const app = express();
app.use(express.json());
app.use(cors());

// Rotas principais
app.use("/api/pessoas", pessoasRoutes);

// Rota de teste para disparar lembretes manualmente
app.get("/api/testar-lembretes", async (req, res) => {
  try {
    await enviarLembretes();
    res.json({ mensagem: "Lembretes enviados com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Conexão com o banco e inicialização do servidor
sequelize.authenticate().then(() => {
  console.log("Conectado ao banco!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch(err => {
  console.error("Erro ao conectar ao banco:", err);
});
