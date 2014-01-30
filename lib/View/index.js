module.exports = {
  home: function(req, res) {
    res.render('home', {
      title: 'Woo!',
      name: req.session.user.name
    });
  },
  register: function(req, res) {
    res.render('register',{
      title: 'Register'
    });
  },
  login: function(req, res) {
    res.render('login',{
      title: 'Login'
    });          
  }
};
