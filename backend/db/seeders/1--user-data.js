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
        hashedPassword: 'dfhsuyf78',
        email: 'johndoe@example.com',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        hashedPassword: 'dshfy889gew',
        email: 'janedoe@example.com',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options);
  }
};
