const db = require('../models');
const { event } = db;

exports.getEvents = function (req, res, next) {
  event.findAll({})
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    return res.status(500).send({error: 'Cannot get events at this time.'});
  });
};

exports.getOneEvent = function (req, res, next) {
  event.findOne({
    where: {
      id: req.body.id
    }
  }).then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    return res.status(500).send({error: `Cannot get event: ${req.body.id} at this time.`});
  })
};

exports.createEvent = function (req, res, next) {
  const { activityName, startDate, endDate, category, location, contest } = req.body;
  event.create({
    activityName,
    startDate,
    endDate,
    category,
    location,
    contest
  }).then(result => {
    if(!result){
      return res.status(400).send({error:'Inproper input'});
    }else{
      res.status(200).send(result);
    }
  })
  .catch(err => {
    return res.status(500).send({err: 'Cannot create an event at this time.'});
  })
}

exports.updateEvent = function (req, res, next) {
  const { activityName, startDate, endDate, category, location, contest } = req.body;
  event.update({
    where: {
      id: req.params.id
    }
  },{
    activityName,
    startDate,
    endDate,
    category,
    location,
    contest
  }).then(result => {
    if(!result){
      return res.status(400).send({error:'Invalid Inputs'});
    }else{
      res.status(200).send(result);
    }
  })
  .catch(err => {
    return res.status(500).send({error: `Cannot update event id: ${req.params.id} at this time.`});
  })
}

exports.deleteEvent = function (req, res, next) {
  event.delete({
    where: {
      id: req.params.id
    }
  })
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    return res.status(500).send({error: `Cannot delete event ID: ${req.params.id} at this time.`});
  })
}