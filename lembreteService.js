const Pessoa = require("./models/pessoaModel");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jpg.lima2011@gmail.com",
    pass: "SUA_SENHA_DE_APP"
  }
});

async function enviarEmail(destinatario, assunto, mensagem, pessoa) {
  try {
    await transporter.sendMail({
      from: "jpg.lima2011@gmail.com",
      to: destinatario,
      subject: assunto,
      text: mensagem
    });
    console.log(`E-mail enviado: ${assunto}`);

    // marca que já houve envio
    pessoa.MensagemEnviada = true;
    await pessoa.save();
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
  }
}

async function enviarLembretes() {
  const hoje = new Date();
  const pessoas = await Pessoa.findAll();

  for (const p of pessoas) {
    const nascimento = new Date(p.DataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const aniversarioEsteAno = new Date(nascimento);
    aniversarioEsteAno.setFullYear(hoje.getFullYear());

    const diffDias = Math.floor((aniversarioEsteAno - hoje) / (1000 * 60 * 60 * 24));

    if (p.Grupo === 1 && [3, 2, 1, 0].includes(diffDias)) {
      await enviarEmail("jpg.lima2011@gmail.com", `Aniversário - ${p.Nome}`,
        `Lembrete: ${p.Nome} faz aniversário em ${diffDias === 0 ? "hoje" : diffDias + " dias"}! Idade: ${idade}. Presente: ${p.Presente}`, p);
    }

    if (diffDias === 0) {
      await enviarEmail("jpg.lima2011@gmail.com", `Aniversário - ${p.Nome}`,
        `Hoje é aniversário de ${p.Nome}! Idade: ${idade}.`, p);
    }
  }
}

cron.schedule("0 8 * * *", enviarLembretes);
cron.schedule("0 14 * * *", enviarLembretes);

cron.schedule("0 * * * *", async () => {
  const pessoas = await Pessoa.findAll({ where: { Confirmado: false, MensagemEnviada: true } });
  for (const p of pessoas) {
    await enviarEmail("jpg.lima2011@gmail.com", `Lembrete pendente - ${p.Nome}`,
      `Ainda não confirmado: aniversário de ${p.Nome}`, p);
  }
});

module.exports = { enviarLembretes };
