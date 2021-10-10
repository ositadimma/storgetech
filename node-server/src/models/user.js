const Sequelize= require('sequelize');

module.exports= sequelize.define('User', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    photoUrl: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    middlename: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    } ,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    } ,
    birthdate: Sequelize.DATE,
    gender: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedBy: Sequelize.INTEGER,
    updatedAt: Sequelize.DATE,
    isDeleted: Sequelize.INTEGER
});