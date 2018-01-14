const ErrorHelper = require('./error.helper');
const db = require('../models');
const Op = require('sequelize').Op;

exports.signup = (idNumber, email, lname, fname, password, confirmation) => {
  return new Promise(async (resolve, reject) => {
    let isAdmin, checkUser, checkAnyUser, createUser;
    try {
      if (password !== confirmation) {
        resolve({err: ErrorHelper.client('Passwords did not match.')});
        return;
      }
      checkUser = await db.user.findOne({
        where: {
          [Op.or]: [{email}, {idNumber}]
        }
      });
      if (checkUser) {
        resolve({err: ErrorHelper.client('Email or ID Code already in use')});
        return;
      }
      checkAnyUser = await db.user.findAll({});
      if (checkAnyUser.length === 0) {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
      createUser = await db.user.create({email, password, isAdmin, lname, fname, idNumber},{individualHooks: true});
      if (!createUser) {
        resolve({err: ErrorHelper.client('User was not created.')});
        return;
      }
      const user = await db.user.findOne({
        where: {id: createUser.id},
        attributes: ['id', 'idNumber', 'email', 'lname', 'fname', 'isAdmin']
      });
      resolve({err: null, user});
    }
    catch (e) {
      reject(ErrorHelper.server());
    }
  });
};
