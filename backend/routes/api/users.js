const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
      check('firstName')
      .exists({ checkFalsy: true })
      .isLength({max: 50})
      .withMessage('Please provide a valid first name.'),
      check('lastName')
      .exists({ checkFalsy: true })
      .isLength({max: 50})
      .withMessage('Please provide a valid last name.'),
    handleValidationErrors
  ];

  router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const user = await User.signup({ firstName, lastName, email, username, password });

      let cookie = await setTokenCookie(res, user);

       user.dataValues.token = cookie

       console.log(user)

      return res.json(user);
    }
  );


module.exports = router;
