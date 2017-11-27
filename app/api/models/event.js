
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    eventName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false }
  });

  event.associate = models => {
    event.hasMany(models.activity);
  }

  return event;
}
