var MongoDB = require('mongodb'),
    MongoClient = MongoDB.MongoClient,
    Server  = MongoDB.Server,
    Promise = require('rsvp').Promise,
    host = 'localhost',
    port = 27017,
    dbName = 'test';

var client = new MongoClient(new Server(host, port)),
    db;

function connect(){
  return new Promise(function(resolve, reject) {
    client.open(function(err, client){
      if (err) {
        return reject(err);
      }
      client = client;
      db = client.db(dbName);
      resolve(client);
    });
  });
}

module.exports.connect = connect;

module.exports.collection = function (name) {
  return db.collection(name);
};
