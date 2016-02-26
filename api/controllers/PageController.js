/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  main: function (req, res) {
    if (req.user || req.wantsJSON) {return res.redirect('/home');}
    return res.view('main');
  },
	home: function (req, res) {
    return res.view('homepage');
  },
  welcome: function (req, res) {
    return res.view('user/welcome');
  },
  login: function(req, res) {
    if (req.user) {return res.redirect('/home');}
    return res.view('user/login');
  },
  logout: function(req, res) {
    return res.view('user/logout');
  },
  signup: function(req, res) {
    return res.view('user/signup');
  },
  profile: function(req, res) {
    return res.view('user/profile');
  }
};

