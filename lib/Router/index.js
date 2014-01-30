module.exports = Router;

function Router () {

  var UserHandler = require('../User/Handler');
  var View = require('../View');

  var userHandler = new UserHandler();

  this.get('/', function(req, res, next) {
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }
    next();
  }, View.home);

  this.get('/register', View.register);

  this.post('/register', [
    userHandler.create,
    userHandler.login
  ]);

  this.get('/login', View.login);
  
  this.post('/login', [
    userHandler.load,
    userHandler.login
  ]);
}
