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
    }
  },
  {
    tableName: "users", // Nome da tabela
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
    },
  },
  {
    tableName: "answers",
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
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_id_answer",
      references: {
        model: "anwsers",
        key: "id",
      },
    },
  },
  {
    tableName: "timelines",
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
    },
    timeline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "fk_id_timeline",
      references: {
        model: "Timeline",
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
        model: "Timeline",
        key: "id_timeline",
      },
    },
    token: {
      type: DataTypes.STRING,
      field: "token",
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
      field: 'id',
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users", // Nome da tabela de usuários
        key: "id",
      },
    },
    token: {
      type: DataTypes.STRING,
      field: "token",
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      field: "expires_at",
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      field: "used",
      defaultValue: false,
    },
  },
  {
    tableName: "password_reset_tokens",
    timestamps: false,
  }
);

//Cardinalidades
User.hasMany(Token, { foreignKey: "user_id", onDelete: "CASCADE"});
User.hasMany(Timeline, { foreignKey: "user_id", onDelete: "CASCADE"});
User.hasMany(Answers, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Access, { foreignKey: "user_id", onDelete: "CASCADE" });

Answers.hasOne(Timeline, {foreignKey: "answer_id", onDelete: "CASCADE"})
Timeline.hasOne(ShareToken, {foreignKey: 'timeline_id', onDelete: "CASCADE"})
Timeline.hasMany(Access, {foreignKey: 'timeline_id', onDelete: "CASCADE"})


//Pertencimentos
Answers.belongsTo(User, { foreignKey: "fk_user_id", onDelete: "CASCADE"})

ShareToken.belongsTo(Timeline, { foreignKey: "timeline_id", onDelete: "CASCADE" });

Token.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Timeline.belongsTo(User, { foreignKey: "fk_user_id", onDelete: "CASCADE" });
Timeline.belongsTo(Answers, { foreignKey: "fk_id_answer", onDelete: "CASCADE" });

Access.belongsTo(User, { foreignKey: "fk_user_id", onDelete: "CASCADE"});
Access.belongsTo(Timeline, { foreignKey: "fk_id_timeline", onDelete: "CASCADE" });




module.exports = { User, Token, Timeline, Answers, Access, ShareToken };
