const passportService = require('./app/api/services/passport.service');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });
const Admin = require('./app/api/middlewares/admin');

const Authentication = require('./app/api/controllers/authentication');
const Event = require('./app/api/controllers/event');

module.exports = (app) => {
  app.get('/', requireAuth, function(req, res, next) {
    res.send({message: 'Super secret code is ABC123'});
  });
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);
  app.get('/event/all', requireAuth, Event.getEvents);
  app.get('/event/one/:id', requireAuth, Event.getOneEvent);
  app.post('/event/create', requireAuth, Admin, Event.createEvent);
  app.put('/event/update/:id', requireAuth, Admin, Event.updateEvent);
  app.delete('/event/delete/:id', requireAuth, Admin, Event.deleteEvent);
};
