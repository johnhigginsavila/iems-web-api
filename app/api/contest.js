const { activity, activityParticipant, participant } = require('../models');

exports.getContests = function (req, res, next) {
	activity.findAll({ 
		where: {
			contest: true
		}
	})
	.then(result => {
		if (result.length === 0) {
			res.status(200).send({message: `There is no contests at this time`});
		} else {
			res.status(200).send(result);
		}
	})
	.catch(error => {
		res.status(500).send({message: `An error occured while geting list of contest`});
	})
}

exports.getOneContest = function (req, res, next) {
	activity.findOne({
		where: {
			contest: true,
			id: req.params.id
		}
	})
	.then(result => {
		if (!result) {
			res.status(400).send({message: `Contest ID: ${req.params.id || `unknown`} is not existing.`});
		} else {
			res.status(200).send(result);
		}
	})
	.catch(error => {
		res.status(500).send({message: `An Error occured while getting contest.`});
	})
}

exports.joinContest = function (req, res, next) {
  // params: activityId
	// variables needed: participant = { name, description, participant }
	const { activityId } = req.params;
	const { participantName, description, members } = req.body;
	if (!req.body|| !participantName || !members || members.length !== 0) {
		res.status(400).send({message: `Invalid inputs.`});
	} else {
		activity.findOne({
			where: {
				id: req.params.activityId,
				contest: true
			}
		})
		.then(result => {
			if(result) {
				participant.create({
					participantName,
					description
				}, {
					individualHooks: true
				})
				.then(result => {
					if (result) {
						activityParticipant.create({
							activityId,
							participantId: result.id
						}, {
							individualHooks: true
						})
						.then(result => {
							if (result) {
								res.status(200).send(result);
							}
						})
						.catch(error => {
							participant.destroy({
								where: {
									id: result.id
								}
							})
							.then(result => {
								res.status(400).send({message: `Unable to join contest please try again later.`});
							})
							.catch(error => {
								res.status(500).send({message: `Unable to delete participant`});
							});
						})
					} else {
						res.status(400).send({message: `Unable to add participate contest error in adding particpants.`})
					}
				})
				.catch(error => {
					res.status(500).send({message: `Unable to join contest server error.`});
				});
			} else {
				res.status(400).send({message: `Activity ID: ${req.params.activityId} is not a contest`})
			}
		})
		.catch(error => {
			res.status(500).send({message: `Unable to join contest server error.`});
		})
	}
}

exports.unjoinContest = function (req, res, next) {
	// ability to unjoin certain activity/ contest
	const { activityId, participantId }= req.params;
	activityParticipant.destroy({
		where: {
			activityId,
			participantId
		}
	}, {
		individualHooks: true
	})
	.then(result => {
		res.status(200).send({message: `Successfully Unjoined the contest.`});
	})
	.catch(error => {
		res.status(500).send({message: `Unjoining unsuccessful, encountered an error.`});
	});
}
