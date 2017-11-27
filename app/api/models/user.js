const bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: DataTypes.STRING,
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  user.associate = models => {
    user.hasMany(models.userParticipant);
    user.hasMany(models.judge);
  };

  
  user.beforeSave(user => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });
  return user;
}

