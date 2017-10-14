module.exports = (sequelize, DataTypes) => {
  const participant = sequelize.define('participant', {
    name: { type: DataTypes.STRING, isUpperCase: true},
    description: { type: DataTypes.TEXT, isUpperCase: true}
  });

  participant.associate = models => {
    participant.belongsTo(models.contest);
    participant.hasMany(models.user);
  };

  return participant;

};