'use strict';

const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'johndoe@example.com',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'janedoe@example.com',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options);
  }
};
