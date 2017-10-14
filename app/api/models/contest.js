
module.exports = (sequelize, DataTypes) => {
  const contest = sequelize.define('contest', {
    description: { type: DataTypes.TEXT, isUpperCase: true}
  });

  contest.associate = models => {
    contest.belongsTo(models.activity);
    contest.hasMany(models.participant);
    contest.hasMany(models.judge);
  };

  return contest;
}
