const Pessoa = require("../models/pessoaModel");
const { Op, fn, col } = require("sequelize");
const sequelize = require("../databaseConnection");

async function enviarLembretes() {
  const hoje = new Date();
  const pessoas = await Pessoa.findAll({
    where: {
      [Op.and]: [
        sequelize.where(fn("DAY", col("DataNascimento")), hoje.getDate()),
        sequelize.where(fn("MONTH", col("DataNascimento")), hoje.getMonth() + 1)
      ]
    }
  });

  pessoas.forEach(p => {
    const idade = hoje.getFullYear() - p.DataNascimento.getFullYear();
    let mensagem;

    if (p.Grupo === 1) {
      mensagem = `Hoje é aniversário de ${p.Nome}! Ela completa ${idade} anos. Não esqueça de comprar: ${p.Presente}.`;
    } else {
      mensagem = `Hoje é aniversário de ${p.Nome}! Ela completa ${idade} anos. Envie uma mensagem de parabéns!`;
    }

    console.log("Enviar via WhatsApp:", mensagem);
    // Aqui você integra com Twilio ou WhatsApp Business API
  });
}

module.exports = { enviarLembretes };
