const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const spotImagesRouter = require('./spot-images');
const reviewImagesRouter = require('./review-image');
const { restoreUser } = require("../../utils/auth.js");
const mapsRouter = require('./maps');



// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImagesRouter)
router.use('/review-images', reviewImagesRouter);
router.use('/maps', mapsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
