module.exports = UserHandler;

var UserModel = require('./Model');

function UserHandler () {

}

UserHandler.prototype = {
  
  create: function (req, res, next) {
    req.user = new UserModel(req.body);
    req.user.save()
      .then(function(data){
        console.log('Save Completed: \n     Saved Data: \n', data);
        next();
      });
  },

  login: function (req, res) {
    req.user.authenticate()
      .then(function(valid) {
        if (valid) {
          req.session.user = req.user.sessionObj();
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      });
  },

  load: function (req, res, next) {
    req.user = new UserModel(req.body);
    next();
  }

};
