module.exports = (sequelize, DataTypes) => {
  let members;
  
  const participant = sequelize.define('participant', {
    participantName: { type: DataTypes.STRING, isUpperCase: true },
    description: { type: DataTypes.TEXT, isUpperCase: true }
  });

  participant.associate = models => {
    participant.hasMany(models.userParticipant);
    participant.hasMany(models.activityParticipant);
  };

  participant.beforeSave(participant => {
    members = participant.members;
  });

  participant.afterCreate(participant => {
    const { id } = participant;
    const { userParticipant } = this.association;
    const bulkCreate = (members) => {
      members.forEach(member => {
        const { id } = member;
        userParticipant.create({
          participant: participant.id,
          user: id
        })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        })
      });
    };
    if (members.length === 0) {
      this.models.participant.destroy({
        where: {
          id
        }
      })
      .then(result => {
        throw new Error('Unable to add Participant instance, no members existed.');
      })
    } else {
      bulkCreate(members);
    }
  });

  participant.afterDestroy(participant => {
    const participantId = participant.id;
    const { userParticipant } = this.association;
    userParticipant.destroy({
      where: {
        participantId
      }
    });
  });

  return participant;
};