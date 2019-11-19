'use strict';

const bCrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: sequelize.fn('NOW')
    }
  }, {
    sequelize,
    underscored: true
  });

  /** CLASS METHODS */
  User.encryptPassword = function encryptPassword(password) {
    return bCrypt.hashSync(password, 10)
  };

  return User;
};