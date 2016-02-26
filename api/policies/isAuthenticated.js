/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {

  // Check for a JWT token in the header
  if (req.header('authorization')) {
    // If one exists, attempt to get the header data
    var token = req.header('authorization').split('Bearer ')[1];
    // If there's nothing after "Bearer", just redirect to login
    if (!token) {return res.redirect('/login');}
    // If there is something, attempt to parse it as a JWT token
    return jwt.verify(token, sails.config.jwtSecret, function(err, payload) {
      // If there's an error verifying the token (e.g. it's invalid or expired),
      // redirect to the login page.
      if (err) {
        return res.redirect('/login');
      }
      // If there's no user ID in the token, redirect to login
      if (!payload.user) {return res.redirect('/login');}
      // Otherwise try to look up that user
      User.findOne(payload.user, function(err, user) {
        if (err) {return res.negotiate(err);}
        // If the user can't be found, redirect to the login page
        if (!user) {return res.redirect('/login');}
        // Otherwise save the user object on the request (i.e. "log in") and continue
        req.user = user;
        return next();
      });
    });
  }

  // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
  // send a 401 response letting the user agent know they need to login to
  // access this endpoint.
  if (req.wantsJSON) {
    return res.send(401);
  }

  // Otherwise if this is an HTML-wanting browser, do a redirect.
  return res.redirect('/login');
};
