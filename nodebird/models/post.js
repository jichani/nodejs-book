const sequelize = require("sequelize");

class Post extends sequelize.Model {
  static initiate(sequelize) {
    Post.init({
      content: {
        type: sequelize.STRING(140),
        allowNull: false,
      },
      img: {
        type: sequelize.STRING(200),
        allowNull: true,
      },
    }),
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      };
  }

  static associate(db) {}
}

module.exports = Post;
