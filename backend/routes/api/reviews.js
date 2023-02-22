const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const spot = require('../../db/models/spot');
const ReviewImages = require('../../db/seeders/5-review-images');

router.get('/current', requireAuth, async(req, res) => {
    const {user} = req;

    let spots = await Spot.findAll({
        include: [
            {model: SpotImage},
        ],
    })

    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON());
    })

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

     let spotImg = await Spot.findAll({
        include: [
            {model: SpotImage, where: {
                id: SpotImage.spotId
            }}
        ],
    })

    const reviews = await Review.findAll({
        include: [
            {model: User,
            attributes: ['id','firstName', 'lastName']},
            {model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
            {model: ReviewImage,
            attributes: ['id', 'url']}
        ],
        where: {
            userId: user.id,
        }
    })



    reviews[0].dataValues.Spot.dataValues.previewImage = spot


    res.status(200).json({reviews})
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
