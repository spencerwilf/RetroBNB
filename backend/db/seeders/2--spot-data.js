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
        name: 'Groovy Loft in the Heart of the City',
        description: "Experience the retro vibes in our groovy loft, located in the heart of the city. Step back in time to the 80's with style and comfort.",
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
        name: 'Spacious Penthouse with Ocean View',
        description: "Live like a boss in our Spacious Penthouse, with 80's vibes and breathtaking Ocean View. Perfect getaway for a retro experience.",
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
        name: 'Vintage Mansion in the Countryside',
        description: "Get transported to the 80's in our Vintage Mansion, nestled in the serene Countryside. A unique and nostalgic experience awaits you.",
        price: 100.00,
      },
      {
        ownerId: 2,
        address: '2345 Mission Bay Dr.',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 45.5231,
        lng: -122.6765,
        name: "Restored 80's Beach House",
        description: "Relive the glory days in our Restored 80's Beach House. Surf, sun and sand await you in this retro paradise by the ocean.",
        price: 500.00,
      },
      {
        ownerId: 1,
        address: '3486 Belmont Ave.',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        lat: 45.5231,
        lng: -122.6765,
        name: 'Groovy Highrise in Downtown',
        description: "Step back into the 80's in our Groovy Highrise, located in the heart of downtown. Stunning views and retro vibes guaranteed.",
        price: 150.00,
      },
      {
        ownerId: 2,
        address: '7625 Albany Rd.',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        lat: 45.5231,
        lng: -122.6765,
        name: 'Cottage in Uptown',
        description: "Escape to our retro Cottage in Uptown. Relax in retro style with all the modern amenities you need for a comfortable stay.",
        price: 90.00,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options);
  }
};
