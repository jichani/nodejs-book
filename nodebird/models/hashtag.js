const sequelize = require("sequelize");

class Hashtag extends sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init({
      title: {
        type: sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
    }),
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      };
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, {
      through: "PostHashtag",
    });
  }
}

module.exports = Hashtag;
