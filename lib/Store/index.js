module.exports = Store;

var Db = require('../Db'),
    Promise = require('rsvp').Promise;

function Store (name) {
  this.db = Db.collection(name); 
}

Store.connect = function connect () {
  return Db.connect();
};

Store.prototype = {

  save: function (data) {
    var promise = new Promise(function(resolve, reject) {
      this.db.save(data, {safe: true}, function(err, res) {
        if (err) {
          reject(err);
        }
        if (res) {
          resolve(data);
        }
      });
    }.bind(this));
    return promise;
  },

  load: function (_id, opts) {
    var method = opts && opts.multi ? 'find' : 'findOne';
    return new Promise(function(resolve, reject) {
      this.db[method]({_id: _id}, function (err, res) {
        if (err) {
          reject(err);
        }
        if (res) {
          resolve(res);
        }
      });
    }.bind(this));      
  }

};
