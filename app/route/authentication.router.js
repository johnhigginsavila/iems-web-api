const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport.service');
const requireSignin = passport.authenticate('local', { session: false });
const Authentication = require('../api/authentication');
const authRouter = express.Router();

authRouter.route('/signin')
.post(requireSignin, Authentication.signin);

authRouter.route('/signup')
.post(Authentication.signup);

module.exports = authRouter;
