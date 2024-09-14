const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const nodemailer = require("nodemailer");

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

// ********************************Conectando ao banco de dados MYSQL**********************************************************//
const sequelize = new Sequelize("claudi_menpp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

//******************************************************Definindo a tabela e seu modelo **************************************************//
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "user_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "username",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_password",
    },
    picture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "picture",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "token",
    },
  },
  {
    tableName: "users", // Nome da tabela
    timestamps: false,
  }
);

//******************************************************Iniciando servidor*****************************************************//
const app = express();
app.use(cors());

app.use(express.json());

app.post("/cadastrar", async (req, res) => {
  const { name, email, password } = req.body;
  let procurar = await procurarUsuario(email);
  console.log(procurar);

  if (!procurar) {
    try {
      const picture = 0;
      const token = "";
      const newUser = await User.create({
        name,
        email,
        password,
        picture,
        token,
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
        res.status(200).json({ message: "Sucesso" });
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

async function updateUserResetPasswordToken(userId, newToken) {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.update({ token: newToken });
    }
  } catch (err) {
    console.error("Error updating user:", err);
  }
}

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
    const token = generateToken();
    await updateUserResetPasswordToken(user.id, token);
    sendEmail(
      email,
      "Redefinição de Senha",
      `Olá ${user.name},
Recebemos uma solicitação para redefinir a sua senha. Para prosseguir com a redefinição, por favor, utilize o código abaixo:

Código de Redefinição: ${token}

Insira este código na página de redefinição de senha para criar uma nova senha. Se você não solicitou a redefinição de senha, por favor, ignore este e-mail. Se precisar de ajuda, entre em contato com o suporte.

Atenciosamente,
MENPP`
    );
    res.send({
      message: "Link de redefinição de senha enviado para o seu e-mail",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Erro ao enviar link de redefinição de senha" });
  }
});

async function testToken(token){
  try {
    let verificacao = await User.findOne({
      where: token
    })
    console.log(!!verificacao)
    return !!verificacao

  } catch (error) {
    return ({ error: 'Erro ao procurar token' });
  } 
}

async function generateToken() {
  let result = "";
  const caracteres = "0123456789";
  const caracteresLength = caracteres.length;
  let counter = 0;
  while (counter < 6) {
    result += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    counter += 1;
  }
  let validado = await testToken(result)
  if(!validado){
    return result;
  }else{
    generateToken()
  }
  
}


//função de confirmação de redefinição de senha
app.post("/resetPasswordConfirm", async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ token });
    if (user) {
      return res.status(404).send({ message: "Token inválido" });
    }
    await updateUserResetPasswordToken(user.id, token);    
    res.send({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao alterar senha" });
  }
});

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
