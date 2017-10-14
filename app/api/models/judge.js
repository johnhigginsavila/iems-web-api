module.exports = (sequelize, DataTypes) => {
  const judge = sequelize.define('judge', {
    description: { type: DataTypes.TEXT, isUpperCase: true }
  });

  judge.associate = models => {
    judge.belongsTo(models.contest);
    judge.belongsTo(models.user);
  };

  return judge;

}