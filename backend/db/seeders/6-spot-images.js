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
      url: 'https://rentpath-res.cloudinary.com/$img_current/t_3x2_jpg_xl/cd56823e5ac8da828ef54e69af8ba7b3',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://www.udr.com/globalassets/communities/the-vintage-lofts-at-west-end/images/aplus_backgroundimagedesktop_1900x1267_vintagelofts_2019_pl3_xx.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://image1.apartmentfinder.com/i2/GBgrd7aU9-Z8RxKb85wVGOXAuHIsdBNMSOHqniiGJ1U/111/the-vintage-lofts-at-west-end-tampa-fl.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://cf.bstatic.com/images/hotel/max1024x768/287/287367704.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://rentpath-res.cloudinary.com/$img_current/t_3x2_jpg_xl/d97cf3093ea93a56d303eb284feda5c8',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://media.vrbo.com/lodging/36000000/35210000/35203600/35203571/9114c35b.c10.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://www.vintageamericanhome.com/wp-content/uploads/2015/02/my-favorite-beach-house-1024x768.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://www.thespruce.com/thmb/FG0svkMvzDXwiF8Nu0luisIjGKw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20201016_BeccaInteriors_Southampton-3-955f9407b00d4fbdadef838841a6d2c5.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://images.squarespace-cdn.com/content/v1/55412ec5e4b0340beb365fa9/1500948941238-G0G53RLLZC1JZ8UD1P1U/vintage+beach+house+floral+wallpaper?format=1500w',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://st.hzcdn.com/simgs/pictures/dining-rooms/vintage-beach-house-refined-interior-staging-solutions-img~afb10c440e5fb2bd_9-2328-1-4183be9.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://s3.us-west-2.amazonaws.com/assets.houfy.com/assets/images/properties/3a985251face588de7ae7a5248741fe4.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://s3.us-west-2.amazonaws.com/assets.houfy.com/assets/images/properties/dfb2a284fd5e523f9a70132d35662523.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://s3.us-west-2.amazonaws.com/assets.houfy.com/assets/images/properties/286b79ff27d3a1240f366006f0334597.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://s3.us-west-2.amazonaws.com/assets.houfy.com/assets/images/properties/7f134da0ab28614c9db0edd465cb5ba3.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://s3.us-west-2.amazonaws.com/assets.houfy.com/assets/images/properties/ca05f50c415d860bbd4110c92868bd6f.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://www.mymove.com/wp-content/uploads/2013/08/GettyImages-200181509-001-scaled.jpg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://media01.findrentals.com/rentals/9685/90741/miramar-beach-home-21-house-water-1.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://www.vrbo.com/vacation-ideas/wp-content/uploads/6bZBhx0p3KqGMYQXrzuZaH/9ed59d1da96f43336d7897e054e19748/fbfc0d18-e7da-4c95-acc1-f42a259c58eb.lg1.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://upload.travelawaits.com/ta/uploads/2022/04/Panhandle-Florida-vacation-home-rental.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://s.wsj.net/public/resources/images/B3-GH141_greer0_M_20200310105126.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://irp-cdn.multiscreensite.com/62bb2936/Blog-091219.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://irp-cdn.multiscreensite.com/62bb2936/Blog-091219-2.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://i.pinimg.com/originals/47/dc/91/47dc91da5670f67c190f0b54e0bf8606.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://images.squarespace-cdn.com/content/v1/55412ec5e4b0340beb365fa9/1547524266554-BOLUMHA3J1XY1GZ637ZT/retro_apartment-6.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://images.squarespace-cdn.com/content/v1/55412ec5e4b0340beb365fa9/1547523647394-65TNAV72K4XRZ18ITPH3/retro_apartment?format=1000w',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://i0.wp.com/housecrazysarah.life/wp-content/uploads/2020/08/Prescott-AZ-vintage-cottage.jpg?fit=1400%2C1050&ssl=1',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://3.bp.blogspot.com/-zeSPkt2TIp8/UoVXytWJ6GI/AAAAAAAArW4/EGLV5PDDUsk/s1600/cottage-living-room-decorating-ideas-2012-4+(1).jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://www.cottagesandbungalowsmag.com/wp-content/uploads/2019/05/cover.png',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://shiplapandshells.com/wp-content/uploads/2021/11/Christmas-cottage-kitchen-11-SQ.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://shiplapandshells.com/wp-content/uploads/2021/11/Christmas-cottage-kitchen-7-SQ-768x1024.jpg',
      preview: false
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
