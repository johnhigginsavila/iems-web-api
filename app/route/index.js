const authRouter = require('./authentication.router');
const eventRouter = require('./event.router');
const activityRouter = require('./activity.router');
const contestRouter = require('./contest.router');
const participantRouter = require('./participant.router');

module.exports = (app) => {
  // auth
  app.use('/api/auth', authRouter);
  // event
  app.use('/api/event', eventRouter);
  // activity
  app.use('/api/activity', activityRouter);
  // contest
  app.use('/api/contest/', contestRouter);
  // participant
  app.use('/api/participant', participantRouter);
};
