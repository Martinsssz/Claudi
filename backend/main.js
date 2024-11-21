//**********************************************************Imports*****************************************************/
const express = require("express");
const cors = require("cors");
const { Sequelize, where } = require("sequelize");
const nodemailer = require("nodemailer");
const { User, Token, Timeline, Answers, Access, ShareToken } = require("./models");

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
        res.status(200).json({ user: user.dataValues, message: "Sucesso" });
        console.log(user);
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

app.post("/updateDataUser", async (req, res) => {
  const { userId, name, email, password } = req.body;

  resultOfUpdate = updateDataUser(userId, name, email, password);

  if (resultOfUpdate) {
    try {
      res.status(200).send({
        message: "Data has been updated",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    console.error("userId is undefined");
    res.status(404).json({ error: "User not found" });
  }
});

app.post("/delete-account", async (req, res) => {
  const { userId } = req.body;
  const user = await User.findByPk(userId);
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

app.post("/timelines", async (req, res) => {
  const { id_timeline } = req.body;
  try {
    const timelines = await Timeline.findByPk(id_timeline);
    console.log(timelines['dataValues']['json'])
    res.json(timelines['dataValues']['json'])
  } catch (error) {
    console.log("Erro ao buscar dados:", error);
  }
});

app.post("/getTimelines", async (req, res) => {
  const { userId } = req.body;
  console.log("------")
  try {
    //Procurar as timelines que o usuário tem acesso
    const timelinesAccess = await Access.findAll({
      attributes: ['timeline_id'],
      where: { user_id: userId }
    });

    //Colocar os IDs dentro de um array
    let timelinesId = []
    timelinesAccess.forEach((item) => {
      timelinesId.push(item['dataValues']['timeline_id'])
    })

    //Procurando os dados das timelines que o usuáriuo tem acesso
    let timelines = []
    for (const id of timelinesId) {
      const foundTimeline = await Timeline.findOne({
        attributes: ['name', 'type'],
        where: { id: id }
      });
      let timeline = await foundTimeline['dataValues']
      timeline['id'] = id
      timeline['owner'] = await Timeline.findOne({ where: { user_id: userId, id: id } }) ? true : false
      console.log(timeline)
      timelines.push(timeline)
    }
    console.log({ timelines })

    res.json({ timelines })
  } catch (error) {
    console.log("Erro ao buscar dados:", error);
  }
});

app.post("/renameTimeline", async (req, res) => {
  const { timelineId, newName } = req.body;
  try {
    Timeline.update(
      {
        name: newName,
      },
      { where: { id: timelineId } }
    );
  } catch (error) {
    console.log("Erro ao buscar dados:", error);
  }
});

app.post("/addShareTimeline", async (req, res) => {
  const { code, userId } = req.body;
  let codeVerification = await ShareToken.findOne({ where: { token: code } })
  if (codeVerification) {
    console.log(codeVerification)

    try {
      let timelineId = codeVerification['dataValues']['id']
      let userHasAcess = await Access.findOne({ where: { user_id: userId, timeline_id: timelineId } })
      if (!userHasAcess) {
        Access.create({
          user_id: userId,
          timeline_id: timelineId,
        })
        res.status(200).json({ error: "OK" });
      } else {
        res.status(400).json({ error: "User already has access" });
      }
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
      res.status(500).json({ error: "Server error" });
    }

  } else {
    res.status(404).json({ error: "Token not found" });
  }

});

app.post("/timelineShareData", async (req, res) => {
  //Verificações
  const { timelineId, userId } = req.body;
  let alreadyHasAToken = await ShareToken.findOne({ where: { timeline_id: timelineId } })
  const token = alreadyHasAToken ? alreadyHasAToken['dataValues']['token'] : await generateLargeToken()
  console.log(token)

  try {
    //Criando Token em necessidade
    if (!alreadyHasAToken) {
      if (await Timeline.findOne({ where: { id: timelineId, user_id: userId } })) {
        await ShareToken.create({
          token: token,
          timeline_id: timelineId
        })
      }
    }

    //Resgantando os usuários que tem acesso
    let usersInTheTimeline = await Access.findAll({
      where: {
        timeline_id: timelineId
      }
    })

    // Resgatando os IDs dos usuários com acesso
    let usersId = []
    usersInTheTimeline.forEach(item => {
      usersId.push(item['dataValues']['user_id'])
    })
    usersId = usersId.filter(id => id != userId)

    //Finalizando
    const dataUsers = []
    for (const id of usersId) {
      const foundUser = await User.findOne({
        attributes: ['username'],
        where: { id: id }
      });
      let user = await foundUser['dataValues']
      user['id'] = id
      dataUsers.push(user)
    }

    res.status(200).json({ usersData: dataUsers, token: token })

  } catch (error) {
    res.status(500)
  }

});

app.post("/deleteTimeline", async (req, res) => {
  const { timelineId, user } = req.body;
  const isOwner = await Timeline.findOne({ where: { user_id: user, id: timelineId } })

  try {
    await Access.destroy({ where: { timeline_id: timelineId, user_id: user } })

    if (isOwner) {
      await Timeline.destroy({ where: { id: timelineId } })
    }
    res.status(200).json({message: "ok"})

  } catch (error) {
    console.log("Erro ao buscar dados:", error)
    res.status(200)
  }
});

app.post("/removeAccessOf", async (req, res) => {
  const { timelineId, user } = req.body;
  try {
    await Access.destroy({ where: { timeline_id: timelineId, user_id: user } })
    res.status(200).json({message: "ok"})
  } catch (error) {
    console.log("Erro ao buscar dados:", error)
    res.status(200)
  }
});

//*********************************************************FUNÇÕES******************************************************/
async function updateDataUser(id, name, email, password) {
  try {
    User.update(
      {
        password: password,
        name: name,
        email: email,
      },
      { where: { id: id } }
    );

    return true;
  } catch {
    console.log("User not found 404");
    return false;
  }
}

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
      where: { token: token, used: false },
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

async function generateLargeToken() {
  let result = "";
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const caracteresLength = caracteres.length;
  let counter = 0;

  while (counter < 6) {
    result += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    counter += 1
  }

  let tokenVerification = await ShareToken.findOne({ where: { token: result } })

  if (!tokenVerification) {
    return result
  } else {
    generateLargeToken()
  }

}
