var express = require('express'),
    app = express(),
    path = require('path'),
    Store = require('./Store'),
    Router = require('./Router').bind(app);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.resolve(path.join(__dirname + '/../views')));
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.cookieSession({
    secret: 'base',
    key: 'AppName',
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../public')));
});

var startServer = app.listen.bind(app, app.get('port'));

Store.connect()
  .then(Router)
  .then(startServer)
  .catch(console.log.bind(console));
