const Sequelize= require('sequelize');

module.exports= sequelize.define('Item_categories', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    status:     Sequelize.BOOLEAN,
    createdBy: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedBy: Sequelize.INTEGER,
    updatedAt: Sequelize.DATE,
    isDeleted: Sequelize.INTEGER
});