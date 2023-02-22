const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const spot = require('../../db/models/spot');
const ReviewImages = require('../../db/seeders/5-review-images');
const review = require('../../db/models/review');

router.get('/current', requireAuth, async(req, res) => {

    const {user} = req;

    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {model: User, attributes: {exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']}},
            {model: Spot},
            {model: ReviewImage}
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
        review.Spot.dataValues.previewImage = 'no preview'
        reviewsArr.push(review.toJSON())
    }

res.json({reviewsArr})


})




// router.post('/current', requireAuth, async (req, res) => {
//     const {review, stars, spotId} = req.body;

//     const { user } = req;

//     let newReview = await user.createReview({
//         spotId,
//         review,
//         stars
//     })
//     res.status(201).json(newReview);
// })




module.exports = router
