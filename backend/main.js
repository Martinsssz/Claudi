//**********************************************************Imports*****************************************************/
const express = require("express");
const cors = require("cors");
const { Sequelize, where } = require("sequelize");
const nodemailer = require("nodemailer");
const { User, Token } = require("./models");

//**********************************************************Emails*****************************************************/
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "menppclaudi@gmail.com",
    pass: "hypw guap gxfw gjyk",
  },
});

function sendEmail(para, assunto, texto) {
  const mailOptions = {
    from: "menppclaudi@gmail.com",
    to: para,
    subject: assunto,
    text: texto,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
}
// ********************************SEQUELIZE*****************************************************************************//
const sequelize = new Sequelize("claudi_menpp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

//******************************************************Iniciando servidor*****************************************************//
const app = express();
app.use(express.json());
app.use(cors());

sequelize
  .sync()
  .then(() => {
    app.listen(8080, () => {
      console.log("Servidor rodando na porta 8080");
    });
  })
  .catch((error) => {
    console.log("Erro ao sincronizar com o banco de dados:", error);
  });

//**************************************************REQUISIÇÕES*************************************************************/
app.post("/cadastrar", async (req, res) => {
  const { name, email, password } = req.body;
  let procurar = await procurarUsuario(email);
  console.log(procurar);

  if (!procurar) {
    try {
      const picture = 0;
      const newUser = await User.create({
        name,
        email,
        password,
        picture,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  } else {
    res.status(500).json({ alreadyUser: "Usuário já cadastrado" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let procurar = await procurarUsuario(email);
  console.log(procurar);

  if (procurar) {
    try {
      const user = await User.findOne({ where: { email } });

      if (user && user.dataValues.password === password) {
        res.status(200).json({user: user.dataValues, message: "Sucesso"});
        console.log(user)
      } else {
        res.status(401).json({ error: "Email ou senha incorretos" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao validar usuário" });
    }
  } else {
    res.status(404).json({ alreadyUser: "Usuário não encontrado" });
  }
});

//função de confirmação de redefinição de senha
app.post("/resetPasswordConfirm", async (req, res) => {
  try {
    const { token, password } = req.body;
    const tokenValido = await verificarToken(token);

    if (!tokenValido) {
      return res.status(404).send({ message: "Token inválido" });
    }

    let user = await testToken(token);
    await invalidOldTokensByToken(token);
    await alterarSenha(user.user_id, password);
    res.status(200).send({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao alterar senha" });
  }
});

//função de redefinição de senha
app.post("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const token = await generateToken(user.id);
    await updateUserResetPasswordToken(user.id, token);
    sendEmail(
      email,
      "Redefinição de Senha",
      `Olá, ${user.name}. \n\n` +
        "Recebemos uma solicitação para redefinir a sua senha. Para prosseguir com a redefinição, por favor, utilize o código abaixo: \n\n" +
        `Código de Redefinição: ${token} \n\n` +
        "Insira este código na página de redefinição de senha para criar uma nova senha. Se você não solicitou a redefinição de senha, por favor, ignore este e-mail. Se precisar de ajuda, entre em contato com o suporte. \n\n" +
        "Atenciosamente, \n" +
        "MENPP"
    );

    res.status(200).send({
      message: "Token de redefinição de senha enviado para o seu e-mail",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Erro ao enviar token de redefinição de senha" });
  }
});

app.post("/delete-account", async (req, res) => {
  const { userId } = req.body;
  const user = await User.findByPk(userId)
  if (user) {
    try {
      await user.destroy();
      res.json({ message: "Conta deletada com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } 
  } else {
    console.error("userId is undefined");
  }
});

//*********************************************************FUNÇÕES******************************************************/
async function procurarUsuario(email) {
  try {
    let verificacao = await User.findOne({
      where: { email },
    });
    return !!verificacao;
  } catch (error) {
    return { error: "Erro ao procurar usuário" };
  }
}

async function alterarSenha(userId, newPassword) {
  try {
    User.update({ password: newPassword }, { where: { id: userId } });
  } catch (error) {
    return { error: "Erro ao alterar a senha do usuário" };
  }
}

//Lógica de tokens

async function verificarToken(token) {
  try {
    let tokenOfDB = await Token.findOne({
      where: { token: token },
    });
    let now = new Date(Date.now());

    if (tokenOfDB) {
      if (!tokenOfDB.used && tokenOfDB.expires_at > now) {
        return true; //token ainda válido
      } else {
        return false; //token invalido
      }
    } else {
      return false; //token não existe
    }
  } catch (error) {
    return { error: "Erro ao procurar token" };
  }
}

async function updateUserResetPasswordToken(userId, token) {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      let limitTime = new Date(Date.now() + 900000);

      const newToken = await Token.create({
        user_id: userId,
        token: token,
        expires_at: limitTime,
        used: false,
      });
    }
  } catch (err) {
    console.error("Error updating user:", err);
  }
}
//Testando se o token já existe
async function testToken(token) {
  try {
    let verificacao = await Token.findOne({
      where: { token: token },
    });

    return verificacao;
  } catch (error) {
    return { error: "Erro ao procurar token" };
  }
}

async function invalidOldTokensByUser(userdId) {
  try {
    await Token.update(
      { used: true },
      { where: { user_id: userdId, used: false } }
    );
  } catch (error) {
    return { error: "Erro ao procurar token" };
  }
}

async function invalidOldTokensByToken(token) {
  try {
    await Token.update(
      { used: true },
      { where: { token: token, used: false } }
    );
  } catch (error) {
    return { error: "Erro ao procurar token" };
  }
}

async function generateToken(user) {
  let result = "";
  const caracteres = "0123456789";
  const caracteresLength = caracteres.length;
  let counter = 0;
  while (counter < 6) {
    result += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    counter += 1;
  }

  let validado = !!(await testToken(result));
  await invalidOldTokensByUser(user);

  if (!validado) {
    return result;
  } else {
    generateToken();
  }
}


  

