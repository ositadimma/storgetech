const User= require('../models/User')



const UserController= {    
    addNewUser: async function (user) {
        const userData = await User.findOne({
            raw: true,
            where: { email: user.email },
        });
        if (userData) {
            throw Error('The email is used in the system');
        } else {
        try {
            const result = await User.create(user);
            return result.dataValues;
        } catch (e) {
            console.error('addNewUser:', e);
            throw e;
        }
        }
    },

    updateUser: async function (attrs, conditions) {
        const userData = await User.findOne({
            raw: true,
            where: { id: conditions.id },
        });
        if (!userData) {
        throw Error('Not found student in the system');
        }
        const result = await User.update(attrs, {
            returning: true,
            where: conditions
        });
    },
    findUserByEmail: async function (email) {
        const user = await User.findOne({
        raw: true,
        where: { email: email },
        });
        return user;
    },
    loadTotalUsers: async function () {
        const results = await User.findAll({
        raw: true,
        attributes: ['id', 'firstName', 'lastName'],
        where: { isDeleted: 0 },
        });
        const data = results.map((user) => {
        return {
            ...user,
            id: user.id,
        };
        });
        return data;
    },
    deleteUser: async function (userId) {
        const result = await User.update(
        { isDeleted: 1 },
        {
           where: {
            id: userId,
          },
        }
        );
        return result;
    },
}

module.exports= UserController;