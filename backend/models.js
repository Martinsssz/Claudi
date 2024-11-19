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

const Timeline = sequelize.define(
  "Timeline",
  {
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
      field: "fk_user_id",
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_id_answer",
      references: {
        model: "anwsers",
        key: "id_answer",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "timelines",
    timestamps: false,
  }

);

const Answers = sequelize.define(
  "Answers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_answer",
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
      field: "json_answers",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_user_id",
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    answer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "time_description",
    },
  },
  {
    tableName: "answers",
    timestamps: false,
  }

);

const Access = sequelize.define(
  "Access_timeline",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_access_timeline",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_user_id",
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    timeline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_id_timeline",
      references: {
        model: "timeline",
        key: "id_timeline",
      },
    },
  },
  {
    tableName: "access_timelines",
    timestamps: false,
  }

);

const ShareToken = sequelize.define(
  "share_token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    timeline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_id_timeline",
      references: {
        model: "timeline",
        key: "id_timeline",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    tableName: "share_token",
    timestamps: false,
  }

);

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

//Cardinalidades
User.hasMany(Token, { foreignKey: "user_id" });
User.hasMany(Timeline, { foreignKey: "user_id" });
User.hasMany(Answers, { foreignKey: "user_id" });
User.hasMany(Access, { foreignKey: "user_id" });

//Pertencimentos
Answers.belongsTo(User, { foreignKey: "fk_user_id" })

ShareToken.belongsTo(Timeline, { foreignKey: "fk_id_timeline" });

Token.belongsTo(User, { foreignKey: "user_id" });

Timeline.belongsTo(User, { foreignKey: "fk_user_id" });
Timeline.belongsTo(Answers, { foreignKey: "fk_id_answer" });

Access.belongsTo(User, { foreignKey: "fk_user_id" });
Access.belongsTo(Timeline, { foreignKey: "fk_id_timeline" });



module.exports = { User, Token, Timeline, Answers, Access, ShareToken };
