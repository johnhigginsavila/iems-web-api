
const express = require('express');
const passport = require('passport');
const eventRouter = express.Router();
const requireAuth = passport.authenticate('jwt', {session: false});
const Admin = require('../middlewares/admin');
const Event = require('../api/event');


eventRouter.route('/')
.get(requireAuth, Event.getEvents)
.post(requireAuth, Admin, Event.createEvent);

eventRouter.route('/:id')
.get(requireAuth, Event.getOneEvent)
.put(requireAuth, Admin, Event.updateEvent)
.delete(requireAuth, Admin, Event.deleteEvent);

module.exports = eventRouter;
