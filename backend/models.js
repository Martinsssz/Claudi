const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("claudi_menpp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

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
      type: DataTypes.STRING,
      allowNull: false,
      field: "picture",
    },
  },
  {
    tableName: "users", // Nome da tabela
    timestamps: false,
  }
);

const Timeline = sequelize.define("Timeline", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_timeline",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "timeline_name",
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "timeline_type",
  },
  json: {
    type: DataTypes.JSON,
    allowNull: false,
    field: "json_views",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "anwsers",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

const Token = sequelize.define(
  "PasswordResetToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Nome da tabela de usuários
        key: "id",
      },
      onDelete: "CASCADE",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "password_reset_tokens",
    timestamps: false,
  }
);

User.hasMany(Token, { foreignKey: "user_id" });
Token.belongsTo(User, { foreignKey: "user_id" });
Timeline.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, Token, Timeline };
