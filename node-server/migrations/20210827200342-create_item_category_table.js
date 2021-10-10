'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Item_categories',{
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      status: Sequelize.BOOLEAN,
      createdBy: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedBy: Sequelize.INTEGER,
      updatedAt: Sequelize.DATE,
      isDeleted: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Item_categories')
  }
};
