const express = require('express');
const passport = require('passport');
const activityRouter = express.Router();
const requireAuth = passport.authenticate('jwt', {session: false});
const Admin = require('../middlewares/admin');
const Activity = require('../api/activity');



activityRouter.route('/')
.get(requireAuth, Activity.getActivities)
.post(requireAuth, Admin, Activity.createActivity);

activityRouter.route('/:id')
.get(requireAuth, Activity.getOneActivity)
.put(requireAuth, Admin, Activity.updateActivity)
.delete(requireAuth, Admin, Activity.deleteActivity);

module.exports = activityRouter;
