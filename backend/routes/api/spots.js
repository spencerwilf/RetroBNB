const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const spot = require('../../db/models/spot');


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


router.get('/', async(req, res) => {
    let spots = await Spot.findAll({
        include: [
            {model: SpotImage},
            {model: Review}
        ],
    })



    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON());
    })



    for (let spot of spotList) {
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

    spotList.forEach(spot => {
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


    res.json({spotList})
})


router.get('/current', requireAuth, async (req, res) => {
    let users = await User.findAll({
        include: [
            {model: Spot}
        ]
    })


    let userJSON = [];
    users.forEach(user => {
        userJSON.push(user.toJSON());
    })


    let spots;
    for (let user of userJSON) {
        spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })
    }
    res.json({spots})
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

    let reviews = await spot.getReviews({
        include: {model: ReviewImage, attributes: ['id', 'url']}
    });
    for (let i = 0; i < reviews.length; i++) {
        let user = await reviews[i].getUser({
            attributes: ['id', 'firstName', 'lastName']
        });
        reviews[i].dataValues.User = user
    }
    return res.json({reviews})
})

module.exports = router
