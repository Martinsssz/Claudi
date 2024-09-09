const express = require('express');
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize');

// ********************************Conectando ao banco de dados MYSQL**********************************************************//
const sequelize = new Sequelize('claudi_menpp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

//******************************************************Definindo a tabela e seu modelo **************************************************//
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "user_id"
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "username"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "user_email"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "user_password"
  },
  picture: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "picture"
  }
}, {
  tableName: 'users', // Nome da tabela 
  timestamps: false,
});

//******************************************************Iniciando servidor*****************************************************//
const app = express();
app.use(cors())

app.use(express.json());

app.post("/cadastrar", async (req, res) => {
  const { name, email, password } = req.body;
  let procurar = procurarUsuario(email) 

  if (!procurar){
    try {
      const picture = 0; 
      console.log(`Nome: ${name} email: ${email} senha: ${password}`)
      const newUser = await User.create({ name, email, password, picture });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }else{
    res.status(500).json({alreadyUser: "Usuário já cadastrado"})
  }
});


async function procurarUsuario(email){
  try {
    let verificacao = await User.findOne({
      where: email
    })

    if(verificacao){
      return true
    }else{
      return false
    }
    
  } catch (error) {
    return ({ error: 'Erro ao procurar usuário' });
  }

}

sequelize.sync()
  .then(() => {
    app.listen(8080, () => {
      console.log('Servidor rodando na porta 8080');
    });
  })
  .catch((error) => {
    console.log('Erro ao sincronizar com o banco de dados:', error);
  });

