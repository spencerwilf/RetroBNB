const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, SpotImage, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const moment = require('moment')


router.delete('/:imageId', requireAuth, async (req, res) => {
    let currentUserId = req.user.id;

    let reviewImage = await ReviewImage.findByPk(req.params.imageId);

    if (!reviewImage) {
        return res.status(404).json({
            "message": "Review Image could not be found",
            "statusCode": 404
          })
    }

    let review = await reviewImage.getReview({
        where: {
            userId: currentUserId
        }
    })

    if (!review || review.id !== reviewImage.reviewId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    await reviewImage.destroy();

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})


module.exports = router;
