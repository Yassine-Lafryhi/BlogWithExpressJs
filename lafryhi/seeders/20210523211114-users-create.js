'use strict';

const faker = require('faker');
const users = [...Array(20)].map((user) => (
    {
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        password: faker.internet.password(12),
        role: faker.random.arrayElement(['admin','author','guest']),
        createdAt: faker.date.between('2021-04-01', '2021-04-30'),
        updatedAt: faker.date.between('2021-05-01', '2021-05-23'),
    }
))
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', users, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
