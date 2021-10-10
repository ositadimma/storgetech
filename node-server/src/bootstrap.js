const item = require('./models/item');

module.exports= async()=>{
    const User= require('./models/User');
    const Item= require('./models/item');
    const ItemCategory= require('./models/itemCategory');

    ItemCategory.hasMany(Item, {as: 'Items', foreignKey: 'itemCategoryId'});
    Item.belongsTo(ItemCategory,{as: 'ItemCategory', foreignKey: 'ItemCategoryId'});

    const createUser= await User.create({
        photoUrl: Sequelize.STRING,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        middleName: Sequelize.STRING,
          email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true
          } ,
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          birthdate: Sequelize.DATE,
          gender: Sequelize.STRING,
          createdAt: Sequelize.DATE,
          updatedBy: Sequelize.INTEGER,
          updatedAt: Sequelize.DATE,
    })
}