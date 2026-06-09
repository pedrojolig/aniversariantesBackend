const express = require("express");
const sequelize = require("./databaseConnection");
const pessoasController = require("./controllers/pessoasController");
const { enviarLembretes } = require("./services/lembreteService");

const app = express();
app.use(express.json());

app.use("/api/pessoas", pessoasController);

sequelize.authenticate().then(() => {
  console.log("Conectado ao banco!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});

// Executa lembretes diariamente (simulação)
setInterval(enviarLembretes, 1000 * 60 * 60 * 24);
