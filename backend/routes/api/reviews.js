const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');


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


router.get('/current', requireAuth, async(req, res) => {

    const {user} = req;

    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {model: User, attributes: {exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']}},
            {model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {model: ReviewImage, attributes: ['id', 'url']},
        ]
    })

    let reviewsArr = [];
    for (let review of reviews) {
        let spot =  await review.getSpot()
        let spotImages = await spot.getSpotImages()
        for (let spotImage of spotImages) {
            if (spotImage.preview === true) {
                review.Spot.dataValues.previewImage = spotImage.url
            }
        }
        if (!review.Spot.dataValues.previewImage) {
            review.Spot.dataValues.previewImage = 'no preview'
        }
        reviewsArr.push(review.toJSON())
    }

res.json({reviewsArr})


})



router.post('/:reviewId/images', requireAuth, async (req, res) => {

    let currentUser = req.user.id;
    let {url} = req.body;

    let review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }


    if (currentUser !== review.userId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }


    let imageCount = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    })

    if (imageCount.length >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    let newImage = await review.createReviewImage({
        url
    })

    res.status(200).json({
        id: newImage.id,
        url: newImage.url
    })

})


router.put('/:reviewId', requireAuth, validateReviewCreation, async (req, res) => {
    let currentUser = req.user.id;
    let {review, stars} = req.body
    let foundReview = await Review.findByPk(req.params.reviewId);

    if (!foundReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (currentUser !== foundReview.userId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    let updatedReview = await foundReview.update({
        review,
        stars
    })

    res.status(200).json(updatedReview)

})


router.delete('/:reviewId', requireAuth, async (req, res) => {
    let review = await Review.findByPk(req.params.reviewId);
    let currentUser = req.user.id;

    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (currentUser !== review.userId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    await review.destroy();

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})



module.exports = router
