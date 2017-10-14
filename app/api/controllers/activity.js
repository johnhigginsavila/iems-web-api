const db = require('../models');
const { activity } = db;

exports.getActivities = function (req, res, next) {
  activity.findAll({})
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    return res.status(500).send({error: 'Cannot get events at this time.'});
  });
};

exports.getOneActivity = function (req, res, next) {
  activity.findOne({
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

exports.createActivity = function (req, res, next) {
  const { activityName, startDate, endDate, event, location, contest } = req.body;
  activity.create({
    activityName,
    startDate,
    endDate,
    event,
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

exports.updateActivity = function (req, res, next) {
  const { activityName, startDate, endDate, event, location } = req.body;
  let contest;
  if(req.body.contest === undefined) {
    contest = null;
  } else {
    contest = req.body.contest;
  }
  activity.update({
    activityName,
    startDate,
    endDate,
    event,
    location,
    contest
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

exports.deleteActivity = function (req, res, next) {
  activity.destroy({
    where: {
      id: req.params.id
    },
    individualHooks: true
  })
  .then(result => {
    if(result === 0) {
      res.status(400).send({error: `activity ID: ${req.params.id} is not existing.`});
    } else {
      res.status(200).send({message: `activity ID: ${req.params.id} has been deleted.`});
    }
  })
  .catch(err => {
    return res.status(500).send({error: `Cannot delete activity ID: ${req.params.id} at this time.`});
  })
}