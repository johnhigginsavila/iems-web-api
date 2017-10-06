module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    activityName: { type: DataTypes.STRING, allowNull: false},
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    contest: { type:DataTypes.BOOLEAN, defaultValue: false }
  });

  return event;
}
