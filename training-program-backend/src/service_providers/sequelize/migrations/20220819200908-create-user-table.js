'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },

      salt: {
        type: DataTypes.STRING,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('user')
  }
};
