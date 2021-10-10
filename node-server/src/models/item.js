const Sequelize= require('sequelize');

module.exports= sequelize.define('Item', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    itemCategoryId: Sequelize.INTEGER,
    status: Sequelize.BOOLEAN,
    createdBy: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedBy: Sequelize.INTEGER,
    updatedAt: Sequelize.DATE,
    isDeleted: Sequelize.INTEGER
});