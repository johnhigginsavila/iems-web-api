
module.exports = (sequelize, DataTypes) => {
  const userParticipant = sequelize.define('userParticipant');
  userParticipant.associate = models => {
    userParticipant.belongsTo(models.user);
    userParticipant.belongsTo(models.participant);
  };

  return userParticipant;
}
