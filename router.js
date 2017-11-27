const passportService = require('./app/api/services/passport.service');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });
const Admin = require('./app/api/middlewares/admin');

const Authentication = require('./app/api/controllers/authentication');
const Event = require('./app/api/controllers/event');
const Activity = require('./app/api/controllers/activity');
const Contest = require('./app/api/controllers/contest');
const Participant = require('./app/api/controllers/participant');

module.exports = (app) => {
  // auth
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);
  // event
  app.get('/event/all',requireAuth, Event.getEvents);
  app.get('/event/one/:id', requireAuth, Event.getOneEvent);
  app.post('/event/create', requireAuth, Admin, Event.createEvent);
  app.put('/event/update/:id', requireAuth, Admin, Event.updateEvent);
  app.delete('/event/delete/:id', requireAuth, Admin, Event.deleteEvent);
  // activity
  app.get('/activity/all', requireAuth, Activity.getActivities);
  app.get('/activity/one/:id', requireAuth, Activity.getOneActivity);
  app.post('/activity/create/:eventId', requireAuth, Admin, Activity.createActivity);
  app.put('/activity/update/:id', requireAuth, Admin, Activity.updateActivity);
  app.delete('/activity/delete/:id', requireAuth, Admin, Activity.deleteActivity);
  // contest
  app.get('/contest/all', Contest.getContests);
  app.get('/contest/one/:id', Contest.getOneContest);
  app.post('/contest/create', Activity.createActivity);
  app.put('/contest/update/:id', Activity.updateActivity);
  app.delete('/contest/delete/:id', Activity.deleteActivity);
  app.post('/contest/join/:activityId', Contest.joinContest);
  app.post('/contest/unjoin/:activityId/:participantId', Contest.unjoinContest);
  // participant
  app.post('/participant/all', Participant.getParticipants);
  app.post('/participant/per-contest/:activityId', Participant.getParticipantsPerContest);
  app.post('/participant/create', Participant.createParticipant);
  app.put('/participant/update/:id', Participant.updateParticipant);
  app.delete('/participant/delete-member/:participantId/:userId', Participant.removeParticipantMember);
  app.delete('/participant/delete/:id', Participant.deleteParticipant);
  app.post('/participant/invite/:inviterId/:inviteeId', Participant.inviteUserParticipant);
  app.post('/participant/accept-invite/:inviterId/:inviteeId', Participant.joinUserParticipantInvite);
  app.post('/participant/decline-invite/:inviterId/:inviteeId', Participant.declineUserParticipantInvite);
};
