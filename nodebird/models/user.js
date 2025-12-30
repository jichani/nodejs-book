const sequelize = require("sequelize");

class User extends sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, // createdAt, updatedAt
        underscored: false, // camelCase
        modelName: "User",
        tableName: "users",
        paranoid: true, // deletedAt 유저 삭제일 // soft delete
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      // 팔로워
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      // 팔로잉
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;
