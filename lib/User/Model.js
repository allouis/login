module.exports = User;

var Store = require('../Store');
var bcrypt = require('bcryptjs');
var _ = require('underscore');

function User (data) {
  this._id = data.username;
  this.name = data.username;
  this.email = data.email;
  this.password = data.password;
}

User.prototype = {

  save: function () {
    var obj = _.extend({},this);
    obj.password = bcrypt.hashSync(this.password, 8);
    return User.store.save(obj);
  },

  authenticate: function () {
    return User.store.load(this._id)
      .then(function(user){
        return bcrypt.compareSync(this.password, user.password);
      }.bind(this));
  },

  sessionObj: function () {
    return {
      email: this.email,
      name: this.name
    }; 
  }

};

User.Collection = User.store = new Store('accounts');
