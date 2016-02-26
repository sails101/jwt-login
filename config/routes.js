module.exports.routes = {

  // HTML Views
  '/': 'PageController.main',
  'get /home': 'PageController.home',
  'get /login': 'PageController.login',
  'get /signup': 'PageController.signup',
  '/welcome': 'PageController.welcome',
  '/logout': 'PageController.logout',
  '/profile': 'PageController.profile',

  // Endpoints
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
};
