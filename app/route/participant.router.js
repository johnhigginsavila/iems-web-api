const express = require('express');
const passport = require('passport');
const participantRouter = express.Router();
const requireAuth = passport.authenticate('jwt', {session: false});
const Admin = require('../middlewares/admin');
const Participant = require('../api/participant');



participantRouter.route('/')
.get(Participant.getParticipants)
.post(Participant.createParticipant)

participantRouter.route('/contest/:activityId')
.get(Participant.getParticipantsPerContest)

participantRouter.route('/:id')
.put(Participant.updateParticipant)
.delete(Participant.deleteParticipant)

participantRouter.route('/:participantId/:userId')
.delete(Participant.removeParticipantMember)

participantRouter.route('/invite/:inviterId/:inviteeId')
.post(Participant.inviteUserParticipant)
.put(Participant.joinUserParticipantInvite)
.delete(Participant.declineUserParticipantInvite);

module.exports = participantRouter;
