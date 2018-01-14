const express = require('express');
const passport = require('passport');
const contestRouter = express.Router();
const requireAuth = passport.authenticate('jwt', {session: false});
const Admin = require('../middlewares/admin');
const Contest = require('../api/contest');


contestRouter.route('/')
.get(Contest.getContests);

contestRouter.route('/:id')
.get(Contest.getOneContest);

contestRouter.route('/activity/:activityId')
.post(Contest.joinContest)

contestRouter.route('/activity/:activityId/:participantId')
.delete(Contest.unjoinContest);

module.exports = contestRouter;
