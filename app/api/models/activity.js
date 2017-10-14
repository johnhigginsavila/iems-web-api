module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    activityName: { type: DataTypes.STRING, allowNull: false, isUpperCase: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    event: { type: DataTypes.STRING, isUpperCase: true },
    location: { type: DataTypes.STRING, isUpperCase: true },
    contest: { type:DataTypes.BOOLEAN, defaultValue: false }
  });

  activity.associate = models => {
    activity.hasMany(models.contest);
  };

  activity.beforeUpdate( activity => {
    if(activity.dataValues.contest === null) {
      activity.dataValues.contest = activity._previousDataValues.contest;
    }
  });

  return activity;
}
