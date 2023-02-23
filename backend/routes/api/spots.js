const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, Booking, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const spot = require('../../db/models/spot');
const moment = require('moment');
const { Op } = require('sequelize');


const validateSpotCreation = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required.'),

    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),

    check('state')
       .exists({ checkFalsy: true })
      .withMessage('State is required.'),

    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required.'),

      check('lat')
      .exists({checkFalsy: true})
      .isNumeric()
      .withMessage('Latitude is not valid'),

      check('lng')
      .exists({checkFalsy: true})
      .isNumeric()
      .withMessage('Longitude is not valid'),

      check('name')
      .exists({checkFalsy: true})
      .isLength({max: 50})
      .withMessage("Name must be less than 50 characters"),

      check('description')
      .exists({checkFalsy: true})
      .withMessage("Description is required"),

      check('price')
      .exists({checkFalsy: true})
      .isNumeric()
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];


  const validateReviewCreation = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required.'),

    check('stars')
      .exists({ checkFalsy: true })
      .isNumeric()
      .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
  ];


router.get('/', async(req, res) => {

    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

    let pagination = {};
    let where = {};

    if (!page) page = 1;
    if (!size) size = 20;

    page = parseInt(page);
    size = parseInt(size);

    if (page < 1) {
        return res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "page": "Page must be greater than or equal to 1",}
            })
        }

    if (page > 10) {
        return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "page": "Page must be less than or equal to 10",}
                })
        }

    if (isNaN(page)) {
        return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "page": "Page input is not valid",}
                })
        }

    if (isNaN(size)) {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "page": "Size input is not valid",}
                })
            }

        if (size < 1) {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "page": "Size must be greater than or equal to 1",}
                })
        }

        if (size > 20) {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "page": "Size must be less than or equal to 20",}
                })
        }

        if (minLat && maxLat) {
            minLat = Number(minLat);
            maxLat = Number(maxLat);
            if (!isNaN(minLat) && !isNaN(maxLat)) {
                where.lat = {[Op.between]: [minLat, maxLat]}
            }
        }

        if (minLat && !maxLat) {
            minLat = Number(minLat);
            if (!isNaN(minLat)) {
                where.lat =  {[Op.gte]: minLat}
            }
        }

        if (maxLat && !minLat) {
            maxLat = Number(maxLat);
            if (!isNaN(maxLat)) {
                where.lat =  {[Op.lte]: maxLat}
            }
        }

        if (minLng && maxLng) {
            minLng = Number(minLng);
            maxLng = Number(maxLng);
            if (!isNaN(minLng) && !isNaN(maxLng)) {
                where.lng = {[Op.between]: [minLng, maxLng]}
            }
        }

        if (minLng && !maxLng) {
            minLng = Number(minLng);
            if (!isNaN(minLng)) {
                where.lng =  {[Op.gte]: minLng}
            }
        }

        if (maxLng && !minLng) {
            maxLng = Number(maxLng);
            if (!isNaN(maxLng)) {
                where.lng =  {[Op.lte]: maxLng}
            }
        }


        if (minPrice && maxPrice) {
            minPrice = Number(minPrice);
            maxPrice = Number(maxPrice);
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                where.price = {[Op.between]: [minPrice, maxPrice]}
            } else {
                return res.status(400).json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                      "priceRange": "Price range is invalid",}
                    })
            }
        }

        if (minPrice) {
            minPrice = Number(minPrice);
            if (!isNaN(minPrice) && minPrice >= 0) {
                where.price = {[Op.gte]: minPrice};
            } else {
                return res.status(400).json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                      "minPrice": "Minimum price must be greater than or equal to 0",}
                    })
            }
        }


        if (maxPrice) {
            maxPrice = Number(maxPrice);
            if (!isNaN(maxPrice) && maxPrice >= 0) {
                where.price = {[Op.lte]: maxPrice};
            } else {
                return res.status(400).json({
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                      "maxPrice": "Minimum price must be greater than or equal to 0",}
                    })
            }
        }


    pagination.limit = size;
    pagination.offset = size * (page - 1);


    let spots = await Spot.findAll({
        include: [
            {model: SpotImage},
            {model: Review}
        ],
        where,
        ...pagination
    })

    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    for (let spot of Spots) {
        let avg = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })

        if (!avg[0].dataValues.avgRating || avg[0].dataValues.avgRating === 'null') {
            spot.avgRating = 'No ratings yet.'
        } else {
            spot.avgRating = parseInt(avg[0].dataValues.avgRating).toFixed(1)

        }
        delete spot.Reviews
    }

    Spots.forEach(spot => {
       spot.SpotImages.forEach(img => {
        if (img.preview === true) {
            spot.previewImage = img.url
        }
       })
       if (!spot.previewImage) {
        spot.previewImage = 'no image available'
       }
       delete spot.SpotImages
    });

    res.json({Spots, page, size})
})




router.get('/current', requireAuth, async (req, res) => {
    let currentUserId = req.user.id;

    let spots = await Spot.findAll({
        where: {
            ownerId: currentUserId
        },
        include: [
            {model: SpotImage},
            {model: Review}
        ],
    })



    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON());
    })



    for (let spot of Spots) {
        let avg = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })
        spot.avgRating = parseInt(avg[0].dataValues.avgRating)
        delete spot.Reviews
    }

    Spots.forEach(spot => {
       spot.SpotImages.forEach(img => {
        if (img.preview === true) {
            spot.previewImage = img.url
        }
       })
       if (!spot.previewImage) {
        spot.previewImage = 'no image available'
       }
       delete spot.SpotImages
    });


    res.json({Spots})
})


router.get('/:spotId', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    let images = await spot.getSpotImages({
        attributes: {exclude: ['createdAt', 'updatedAt', 'spotId']}
    })
    let owner = await spot.getUser()
    let reviewCount = await Review.count({
        where: {
            spotId: spot.id
        }
    })
    let avg = await Review.findAll({
        where: {
            spotId: spot.id
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ]
    })
    delete owner.dataValues.username
    spot.dataValues.reviewCount = reviewCount
    spot.dataValues.avgStarRating = avg[0].dataValues.avgRating
    spot.dataValues.SpotImages = images
    spot.dataValues.Owner = owner
    res.json(spot)
})


router.post('/', requireAuth, validateSpotCreation, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const { user } = req;

    let newSpot = await user.createSpot({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(201).json(newSpot);
})


router.post('/:spotId/images', requireAuth, async (req, res) => {

    const {url, preview} = req.body;

    let currentUser = req.user.id;

    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    let ownerId = spot.ownerId;
    if (currentUser !== ownerId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    let image = await spot.createSpotImage({
        url,
        preview
    })



    res.status(200).json({
        id: image.id,
        url: image.url,
        preview: image.preview
    })
})


router.put('/:spotId', requireAuth, validateSpotCreation, async(req, res) => {
    let currentUser = req.user.id;

    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    let ownerId = spot.ownerId;
    if (currentUser !== ownerId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    let newSpot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(200).json(newSpot)
})


router.delete('/:spotId', requireAuth, async (req, res) => {
    let currentUser = req.user.id;

    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    let ownerId = spot.ownerId;
    if (currentUser !== ownerId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    await spot.destroy();

    res.status(200).json({
  "message": "Successfully deleted",
  "statusCode": 200
})
})


router.get('/:spotId/reviews', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    let Reviews = await spot.getReviews({
        include: {model: ReviewImage, attributes: ['id', 'url']}
    });
    for (let i = 0; i < Reviews.length; i++) {
        let user = await Reviews[i].getUser({
            attributes: ['id', 'firstName', 'lastName']
        });
        Reviews[i].dataValues.User = user
    }
    return res.json({Reviews})
})


router.post('/:spotId/reviews', requireAuth, validateReviewCreation, async (req, res) => {
    let currentUserId = req.user.id;
    let spot = await Spot.findByPk(req.params.spotId);

    let {review, stars} = req.body;

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    let userReviews = await spot.getReviews({
        where: {
            userId: currentUserId
        }
    })


    if (userReviews.length) {
        return res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
          })
    }

    let newReview = await spot.createReview({
        userId: currentUserId,
        review,
        stars
    })


    res.json(newReview)
})


router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    let currentUser = req.user.id;

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    let bookings = await spot.getBookings({
        attributes: ['spotId', 'startDate', 'endDate']
    })

    if (currentUser !== spot.ownerId) {
        return res.status(200).json({bookings})
    }

    if (currentUser === spot.ownerId) {
        let bookings = await Booking.findAll({
            where: {
                userId: currentUser
            },
            include: {model: User, attributes: ['id', 'firstName', 'lastName']}
        })

        return res.status(200).json({bookings})
    }
})


router.post('/:spotId/bookings', requireAuth, async(req, res) => {
    let currentUserId = req.user.id;
    let {startDate, endDate} = req.body;

    let spot = await Spot.findByPk(req.params.spotId)


    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }

    let spotOwner = await spot.getUser();
    if (spotOwner.id === currentUserId) {
        return res.status(404).json({
            "message": "You cannot book your own spot",
            "statusCode": 403
          })
    }

    if (endDate <= startDate) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
    }

    let newStartDate = new Date(startDate).getTime();
    let newEndDate = new Date(endDate).getTime();
    let today = new Date().getTime();


    let bookingsArr = [];
    let spotBookings = await spot.getBookings();
    for (let booking of spotBookings) {
        bookingsArr.push(booking.toJSON())
    }

    for (let booking of bookingsArr) {

        let existingBookingStart = new Date(booking.startDate).getTime();
        let existingBookingEnd = new Date(booking.endDate).getTime();

        if ((newStartDate >= existingBookingStart && newStartDate <= existingBookingEnd) || (newEndDate <= existingBookingEnd && newEndDate >= existingBookingStart)) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                  "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
                }
              })
        }
    }



    let newBooking = await spot.createBooking({
        userId: currentUserId,
        startDate,
        endDate
    })

    res.status(200).json(newBooking)
})


module.exports = router
