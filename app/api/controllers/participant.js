const { participant, userParticipant } = require('../models');

exports.getParticipants = function (req, res, next) {
  // get all participants
  participant.findAll({})
  .then(result => {
    res.status(200).send(result);
  })
  .catch(error => {
    res.status(500).send({ error: `Server error, cannot get participants at this time`});
  });
}

exports.getParticipantsPerContest = function (req, res, next) {
  // get participants per contest
  const { activityId } = req.params;
  participant.findOnd({
    where: {
      activityId
    },
    individualHooks: true
  })
  .then(result => {
    if (!result) {
      res.status(400).send({ message: `No participants for activity ID: ${activityId}`});
    } else {
      res.status(200).send(result);
    }
  })
  .catch(result => {
    res.status(500).send({error: `Server Error: Cannot get participants at this time`});
  });
}

exports.createParticipant = function (req, res, next) {
  // create participant
  const { members, description, participantName } = req.body;
  participant.create({
    members,
    description,
    participantName
  }, {
    individualHooks: true
  })
  .then(result => {
    if (!result) {
      res.status(400).send({message: `Unable to create participant. Invalid Inputs`});
    } else {
      res.status(200).send(result);
    }
  })
  .catch(result => {
    res.status(500).send({message: `Server error: Unable to create participant.`})
  });
}

exports.updateParticipant = function (req, res, next) {
  const { id } = req.params;
  const { members, participantName, description } = req.body;
  participant.update({
    members,
    participantName,
    description
  }, {
    where: {
      id
    },
    individualHooks: true
  })
  .then(result => {
    if (!result) {
      res.staus(400).send({message: `Unable to update participant ID: ${id}. Invalid Inputs.`});
    } else {
      res.staus(200).send(result);
    }
  })
  .catch(result => {
    res.status(500).send({error: `Server Error. Cannot update participant ID: ${id}.`});
  });
}

exports.removeParticipantMember = function (req, res, next) {
  const { participantId, userId } = req.params;
  userParticipant.delete({
    where: {
      participantId,
      userId
    },
    individualHooks: true
  })
  .then(result => {
    res.status(200).send(result);
  })
  .catch(error => {
    res.staus(500).send({error: `Server error: Unable to delete member ID: ${userID}`})
  });
}

exports.deleteParticipant = function (req, res, next) {
  const { id } = req.params;
  participant.destroy({
    where: {
      id
    },
    individualHooks: true
  })
  .then(result => {
    res.status(200).send({message: `Unable to delete Participant ID: ${id}`});
  })
  .catch(error => {
    res.status(500).send({error: `Server error: Unable to delete Participant ID: ${id} at this time.`});
  })
}

exports.inviteUserParticipant = function (req, res, next) {
  
}

exports.joinUserParticipantInvite = function (req, res, next) {
  
}

exports.declineUserParticipantInvite = function (req, res, next) {
    
}