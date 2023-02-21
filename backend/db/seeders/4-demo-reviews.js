'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      review: 'This spot was amazing! The views were incredible and the amenities were top-notch.',
      stars: 5,
    },
    {
      spotId: 2,
      userId: 1,
      review: 'I had a great time at this spot! The location was convenient and the staff were friendly.',
      stars: 4,
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options);
  }
};
