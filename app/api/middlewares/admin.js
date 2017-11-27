
const Admin = function (req, res, next) {
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin) {
    console.log('Intruder');
    res.status(400).send({error:'Unauthorized user!'});
  }else{
    console.log('OK');
    next();
  }
  
}

module.exports = Admin;
