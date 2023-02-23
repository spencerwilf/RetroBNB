const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, SpotImage, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const moment = require('moment')


router.get('/current', requireAuth, async (req, res) => {
    let curentUserId = req.user.id;

    let bookings = await Booking.findAll({
        where: {
            userId: curentUserId
        },
        include: [
            {model: Spot, attributes: {exclude : ['createdAt', 'updatedAt', 'description']}}
        ]
    })


    let arr = [];
    for (let booking of bookings) {
        let spot =  await booking.getSpot()
        let spotImages = await spot.getSpotImages()
        for (let spotImage of spotImages) {
            if (spotImage.preview === true) {
                booking.Spot.dataValues.previewImage = spotImage.url
            }
        }
        if (!booking.Spot.dataValues.previewImage) {
            booking.Spot.dataValues.previewImage = 'no preview'
        }
        arr.push(booking.toJSON())
    }

    res.json({bookings})
})



router.put('/:bookingId', requireAuth, async(req, res) => {
    let {startDate, endDate} = req.body;
    let currentUserId = req.user.id;

    let booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    if (booking.userId !== currentUserId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

let newStartDate = new Date(startDate).getTime();
let newEndDate = new Date(endDate).getTime();
let today = new Date().getTime();


    if (today > newEndDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    if (newStartDate > newEndDate) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
          })
    }

    let allSpotBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    })



    let bookings = [];
    for (let booking of allSpotBookings) {
        bookings.push(booking.toJSON());
    }



    for (let booking of bookings) {

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

    let updatedBooking = await booking.update({
        startDate,
        endDate
    })

res.json(updatedBooking)
})


router.delete('/:bookingId', requireAuth, async(req, res) => {
    let currentUserId = req.user.id;

    let booking = await Booking.findByPk(req.params.bookingId);



    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    let user = await booking.getUser();
    if (user.id !== currentUserId) {
        return res.status(403).json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    let newStartDate = new Date(booking.startDate).getTime();
    let today = new Date().getTime();


    if (today >= newStartDate) {
        return res.status(200).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }

    await booking.destroy();

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})


module.exports = router;
