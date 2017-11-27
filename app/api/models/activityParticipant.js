module.exports = (sequelize, DataTypes) => {
  const activityParticipant = sequelize.define('activityParticipant');

  activityParticipant.associate = models => {
    activityParticipant.belongsTo(models.activity);
    activityParticipant.belongsTo(models.participant);
  };

  return activityParticipant;
}
