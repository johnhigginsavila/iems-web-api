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
  const { eventName, startDate, endDate, description } = req.body;
  activity.create({
		eventName,
		description,
		startDate,
		endDate
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
  const { eventName, startDate, endDate, description } = req.body;
  event.update({
    eventName,
		description,
		startDate,
		endDate
  }, {
    where: {
      id: req.params.id
    },
    individualHooks: true
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

exports.deleteEvent= function (req, res, next) {
  event.destroy({
    where: {
      id: req.params.id
    },
    individualHooks: true
  })
  .then(result => {
    if(result === 0) {
      res.status(400).send({error: `event ID: ${req.params.id} is not existing.`});
    } else {
      res.status(200).send({message: `event ID: ${req.params.id} has been deleted.`});
    }
  })
  .catch(err => {
    return res.status(500).send({error: `Cannot delete event ID: ${req.params.id} at this time.`});
  })
}
