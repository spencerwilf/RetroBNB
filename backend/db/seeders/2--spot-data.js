'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Cozy Loft in the Heart of the City',
        description: 'Enjoy this cozy loft',
        price: 150.00,
      },
      {
        ownerId: 2,
        address: '456 Ocean Drive',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Spacious Condo with Ocean View',
        description: 'Relax and unwind',
        price: 250.00,
      },
      {
        ownerId: 1,
        address: '789 Forest Road',
        city: 'Portland',
        state: 'OR',
        country: 'USA',
        lat: 45.5231,
        lng: -122.6765,
        name: 'Charming Cottage in the Woods',
        description: 'Escape the hustle and bustle',
        price: 100.00,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
