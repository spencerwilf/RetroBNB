'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {spotId: 1, userId: 2, startDate: '2023-05-21', endDate: '2023-06-12'},
      {spotId: 2, userId: 1, startDate: '2023-03-22', endDate: '2023-04-12'},
      {spotId: 3, userId: 1, startDate: '2023-07-25', endDate: '2023-08-12'},
      {spotId: 2, userId: 1, startDate: '2023-02-10', endDate: '2023-02-30'},
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options);
  }
};
