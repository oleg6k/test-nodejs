'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    expires: DataTypes.DATE
  }, {
    sequelize,
    underscored: true
  });
  Token.associate = function (models) {
    // associations can be defined here
  };

  return Token;
};