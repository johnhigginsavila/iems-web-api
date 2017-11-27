module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    activityName: { type: DataTypes.STRING, allowNull: false, isUpperCase: true },
    description: { type: DataTypes.STRING, allowNull: false, isUpperCase: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, isUpperCase: true },
    contest: { type:DataTypes.BOOLEAN, defaultValue: false }
  });

  activity.associate = models => {
    activity.belongsTo(models.event);
    activity.hasMany(models.participant);
    activity.hasMany(models.activityParticipant);
    activity.hasMany(models.judge);
  };

  activity.beforeUpdate( activity => {
    if(activity.dataValues.contest === null) {
      activity.dataValues.contest = activity._previousDataValues.contest;
    }
  });

  return activity;
}
