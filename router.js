const passportService = require('./app/api/services/passport.service');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });
const Admin = require('./app/api/middlewares/admin');

const Authentication = require('./app/api/controllers/authentication');
const Activity = require('./app/api/controllers/activity');

module.exports = (app) => {
  app.get('/', requireAuth, function(req, res, next) {
    res.send({message: 'Super secret code is ABC123'});
  });
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);
  app.get('/activity/all', requireAuth, Activity.getActivities);
  app.get('/activity/one/:id', requireAuth, Activity.getOneActivity);
  app.post('/activity/create', requireAuth, Admin, Activity.createActivity);
  app.put('/activity/update/:id', requireAuth, Admin, Activity.updateActivity);
  app.delete('/activity/delete/:id', requireAuth, Admin, Activity.deleteActivity);
};
