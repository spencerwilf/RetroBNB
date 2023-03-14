'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://media.architecturaldigest.com/photos/62b6036de8be957a9ea4ccac/master/w_1600%2Cc_limit/The%2520Boot%2520-%2520New%2520Zealand.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'www.test.net',
      preview: false
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
