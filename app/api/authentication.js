const db = require('../models');
const jwtService = require('../services/jwt.service');
const AuthHelper = require('../helpers/authentication.helper');
const ErrorHelper = require('../helpers/error.helper');

exports.signin = async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: {id: req.user.id},
      attributes: ['id', 'idNumber', 'email', 'lname', 'fname', 'isAdmin']
    });
    res.status(200).send({user, token: jwtService.tokenForUser(req.user)}); 
  }
  catch (e) {
    res.status(500).send(ErrorHelper.server());
  }
};

exports.signup = async (req, res, next) => {
  const { idNumber, email, fname, lname, password, confirmation } = req.body;
  let result;
  try {
    result = await AuthHelper.signup(idNumber, email, lname, fname, password, confirmation);
    if (result.err) {
      res.status(400).send(ErrorHelper.client(result.err));
      return;
    }
    const token = jwtService.tokenForUser(result.user);
    res.status(200).send({user: result.user, token});
  }
  catch (e) {
    res.status(500).send(ErrorHelper.server());
  }
}
