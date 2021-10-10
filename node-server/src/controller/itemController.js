const Item = require('../models/item');
const ItemCategory = require('../models/itemCategory');
const {QueryTypes}= require('sequelize')

ItemCategory.hasMany(Item, {as: 'Items', foreignKey: 'itemCategoryId'});
Item.belongsTo(ItemCategory,{as: 'ItemCategory', foreignKey: 'ItemCategoryId'});

const ItemController= {
    addNewItem: async function (item) {
         try {
          const result = await Item.create(item);
          return result.dataValues;
         } catch (e) {
          console.error('addNewItem:', e);
         }        
    },
    updateItem: async function (attrs, conditions) {
        const itemData = await Item.findOne({
            raw: true,
            where: { id: conditions.id },
        });
        if (!itemData) {
        throw Error('Not found student in the system');
        }
        const result = await Item.update(attrs, {
            returning: true,
            where: conditions
        });
    },
    findItemById: async function (id) {
        const item = await Item.findOne({
            raw: true,
            where: { id: id },
        });
        return item;
    },
    loadTotalItems: async function () {
        const results =await sequelize.query(
            'SELECT I.id, I.name, I.status, I.itemCategoryId, C.name categoryName FROM Items I JOIN Item_categories C ON I.itemCategoryId=C.id WHERE I.isDeleted=0;',
            {
                type: QueryTypes.SELECT
            }
        );

        const data = results.map((item) => {
            return {
            ...item,
            id: item.id,
            };
        });
        return data;
    },
    deleteItem: async function (itemId) {
        const result = await Item.update(
            { isDeleted: 1 },
            {
            where: {
            id: itemId,
            },
            }
        );
        return result;
    },
    addNewItemCategory: async function (category) {
       try {
          const result = await ItemCategory.create(category);
          return result.dataValues;
         } catch (e) {
          console.error('addNewItem:', e);
         }       
    },
    updateItemCategory: async function (attrs, conditions) {
        const categoryData = await ItemCategory.findOne({
            raw: true,
            where: { id: conditions.id },
        });
        if (!categoryData) {
        throw Error('Not found category in the system');
        }
        const result = await ItemCategory.update(attrs, {
            returning: true,
            where: conditions
        });
    },
    findItemCategoryById: async function (id) {
        const category = await ItemCategory.findOne({
            raw: true,
            where: { id: id },
        });
        return category;
    },
    loadTotalItemCategories: async function () {
        const results = await ItemCategory.findAll({
            raw: true,
            attributes: ['id', 'name','status'],
            where: { isDeleted: 0 },
        });
        const data = results.map((category) => {
            return {
            ...category,
            id: category.id,
            };
        });
        return data;
    },
    deleteItemCategory: async function (categoryId) {
        const result = await ItemCategory.update(
            { isDeleted: 1 },
            {
            where: {
            id: categoryId,
            },
            }
        );
        return result;
    },
}

module.exports= ItemController;