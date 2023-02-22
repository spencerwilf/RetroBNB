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



    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [{model: User, attributes: {exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']}},
        {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt', 'description']}, include: {
            model: SpotImage, attributes: ['preview'], where: {

            }
        }},
        {model: ReviewImage}]
    })







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
